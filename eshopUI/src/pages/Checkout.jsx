import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, ChevronRight, Lock, Check, Package } from "lucide-react";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const STEPS = ["Shipping", "Payment", "Review"];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all
            ${i === current ? "bg-primary-600 text-white" : i < current ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
            {i < current ? <Check className="w-3.5 h-3.5" /> : <span>{i + 1}</span>}
            {s}
          </div>
          {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300" />}
        </div>
      ))}
    </div>
  );
}

export default function Checkout() {
  const { cart, cartTotal, clearCart, user } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ship, setShip] = useState({ name: user?.name || "", email: user?.email || "", phone: "", address: "", city: "", state: "", zip: "", country: "US" });
  const [pay, setPay] = useState({ cardName: "", cardNum: "", expiry: "", cvv: "" });

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const fmtCard = v => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const fmtExpiry = v => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d; };

  const handleShipNext = (e) => {
    e.preventDefault();
    if (!ship.name || !ship.email || !ship.address || !ship.city || !ship.zip) {
      toast.error("Please fill all required fields"); return;
    }
    setStep(1);
  };

  const handlePayNext = (e) => {
    e.preventDefault();
    if (!pay.cardName || pay.cardNum.replace(/\s/g,"").length < 16 || !pay.expiry || !pay.cvv) {
      toast.error("Please fill all payment details"); return;
    }
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    clearCart();
    toast.success("Order placed successfully! 🎉");
    navigate("/order-success");
  };

  if (cart.length === 0 && !loading) {
    navigate("/cart"); return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-display font-bold text-2xl text-gray-900 text-center mb-2">Checkout</h1>
      <p className="text-gray-500 text-sm text-center mb-8">Secure, encrypted checkout</p>

      <StepIndicator current={step} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          {/* Step 0: Shipping */}
          {step === 0 && (
            <form onSubmit={handleShipNext} className="card p-6 animate-slide-up">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary-600" />
                </div>
                <h2 className="font-semibold text-gray-900">Shipping Address</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Full Name *</label>
                  <input value={ship.name} onChange={e => setShip({...ship, name: e.target.value})} className="input" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Email *</label>
                  <input type="email" value={ship.email} onChange={e => setShip({...ship, email: e.target.value})} className="input" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Phone</label>
                  <input value={ship.phone} onChange={e => setShip({...ship, phone: e.target.value})} className="input" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Address *</label>
                  <input value={ship.address} onChange={e => setShip({...ship, address: e.target.value})} className="input" placeholder="123 Main Street, Apt 4B" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">City *</label>
                  <input value={ship.city} onChange={e => setShip({...ship, city: e.target.value})} className="input" placeholder="San Francisco" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">State</label>
                  <input value={ship.state} onChange={e => setShip({...ship, state: e.target.value})} className="input" placeholder="CA" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">ZIP Code *</label>
                  <input value={ship.zip} onChange={e => setShip({...ship, zip: e.target.value})} className="input" placeholder="94105" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Country</label>
                  <input value={ship.country} onChange={e => setShip({...ship, country: e.target.value})} className="input" placeholder="US" />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full mt-5 py-3">Continue to Payment</button>
            </form>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <form onSubmit={handlePayNext} className="card p-6 animate-slide-up">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-primary-600" />
                </div>
                <h2 className="font-semibold text-gray-900">Payment Details</h2>
                <span className="ml-auto flex items-center gap-1 text-xs text-gray-500">
                  <Lock className="w-3 h-3" /> SSL Secured
                </span>
              </div>

              {/* Card Preview */}
              <div className="bg-gradient-to-br from-primary-600 to-indigo-600 text-white rounded-2xl p-5 mb-5">
                <div className="flex justify-between items-start mb-8">
                  <div className="font-display font-bold">ShopWave</div>
                  <CreditCard className="w-6 h-6 opacity-70" />
                </div>
                <p className="font-mono text-lg tracking-widest mb-3">
                  {pay.cardNum || "•••• •••• •••• ••••"}
                </p>
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="opacity-60 text-xs">Card Holder</p>
                    <p className="font-medium">{pay.cardName || "Your Name"}</p>
                  </div>
                  <div>
                    <p className="opacity-60 text-xs">Expires</p>
                    <p className="font-medium">{pay.expiry || "MM/YY"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Cardholder Name *</label>
                  <input value={pay.cardName} onChange={e => setPay({...pay, cardName: e.target.value})} className="input" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Card Number *</label>
                  <input value={pay.cardNum} onChange={e => setPay({...pay, cardNum: fmtCard(e.target.value)})}
                    className="input font-mono" placeholder="1234 5678 9012 3456" maxLength={19} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Expiry *</label>
                    <input value={pay.expiry} onChange={e => setPay({...pay, expiry: fmtExpiry(e.target.value)})}
                      className="input" placeholder="MM/YY" maxLength={5} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">CVV *</label>
                    <input value={pay.cvv} onChange={e => setPay({...pay, cvv: e.target.value.replace(/\D/g,"").slice(0,4)})}
                      className="input" placeholder="•••" type="password" maxLength={4} />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button type="button" onClick={() => setStep(0)} className="btn-secondary flex-1 py-3">Back</button>
                <button type="submit" className="btn-primary flex-1 py-3">Review Order</button>
              </div>
            </form>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="card p-6 animate-slide-up">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-green-600" />
                </div>
                <h2 className="font-semibold text-gray-900">Review Order</h2>
              </div>
              <div className="space-y-3 mb-5">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-surface-secondary rounded-xl">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <span className="font-bold text-gray-900 text-sm">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="bg-surface-secondary rounded-xl p-4 mb-5 text-sm space-y-1">
                <p className="font-semibold text-gray-900 mb-2">Shipping to:</p>
                <p className="text-gray-600">{ship.name} · {ship.email}</p>
                <p className="text-gray-600">{ship.address}, {ship.city} {ship.zip}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary flex-1 py-3">Back</button>
                <button onClick={handlePlaceOrder} disabled={loading}
                  className="btn-primary flex-1 py-3 flex items-center justify-center gap-2">
                  {loading ? (
                    <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/><path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Processing…</>
                  ) : (
                    <><Lock className="w-4 h-4" /> Place Order (${total.toFixed(2)})</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <div className="lg:col-span-2">
          <div className="card p-5 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2.5 text-sm mb-4 max-h-64 overflow-y-auto">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span className="truncate mr-2">{item.name} ×{item.qty}</span>
                  <span className="shrink-0">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-surface-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-gray-900 text-base border-t border-surface-border pt-2">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
