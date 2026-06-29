import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useApp } from "../context/AppContext";
import { EmptyState } from "../components/ui";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal } = useApp();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = (cartTotal - discount) * 0.08;
  const total = cartTotal - discount + shipping + tax;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE20") {
      setDiscount(cartTotal * 0.2);
      toast.success("Coupon applied! 20% off.");
    } else if (coupon.toUpperCase() === "FIRST10") {
      setDiscount(10);
      toast.success("Coupon applied! $10 off.");
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="font-display font-bold text-2xl text-gray-900 mb-8">Your Cart</h1>
        <EmptyState icon={ShoppingBag} title="Your cart is empty"
          message="Looks like you haven't added anything yet. Start shopping!"
          action={{ label: "Browse Products", fn: () => navigate("/shop") }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-display font-bold text-2xl text-gray-900 mb-8">
        Your Cart <span className="text-gray-400 font-normal text-lg">({cart.length} {cart.length === 1 ? "item" : "items"})</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="card p-4 flex items-start gap-4 animate-fade-in">
              <img src={item.image} alt={item.name}
                className="w-20 h-20 rounded-xl object-cover bg-gray-50 shrink-0 cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">{item.name}</p>
                <p className="text-xs text-gray-500 mb-3">{item.category}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-surface-border rounded-lg overflow-hidden">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => { removeFromCart(item.id); toast("Item removed from cart", { icon: "🗑️" }); }}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary-600" /> Coupon Code
            </h3>
            <div className="flex gap-2">
              <input value={coupon} onChange={e => setCoupon(e.target.value)}
                placeholder="Enter code (try SAVE20)" className="input flex-1 py-2 text-sm" />
              <button onClick={applyCoupon} className="btn-secondary text-sm px-4 py-2">Apply</button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Try: SAVE20 or FIRST10</p>
          </div>

          {/* Order Summary */}
          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2.5 text-sm mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-surface-border pt-2.5 flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-lg mb-4">
                Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
              </p>
            )}
            <button onClick={() => navigate("/checkout")}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-base">
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigate("/shop")} className="btn-ghost w-full mt-2 text-sm">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
