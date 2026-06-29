import { useNavigate } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { useApp } from "../context/AppContext";
import { orders } from "../data/mockData";
import { StatusBadge, EmptyState, ProductCard } from "../components/ui";

// ─── Order Success ────────────────────────────────────────────────────────────
export function OrderSuccess() {
  const navigate = useNavigate();
  const orderId = `ORD-${Math.floor(Math.random() * 9000 + 1000)}`;
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-slide-up">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-1">Your order has been confirmed and is being processed.</p>
        <p className="text-sm font-semibold text-primary-600 mb-8">Order #{orderId}</p>
        <div className="card p-5 mb-6 text-sm text-left space-y-3">
          {[["📦", "Processing", "We're preparing your items"], ["🚚", "Shipping", "Usually 2-5 business days"], ["✅", "Delivered", "To your door"]].map(([e, t, d]) => (
            <div key={t} className="flex items-center gap-3">
              <span className="text-xl">{e}</span>
              <div><p className="font-semibold text-gray-900">{t}</p><p className="text-gray-500 text-xs">{d}</p></div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => navigate("/orders")} className="btn-secondary flex items-center gap-2">
            <Package className="w-4 h-4" /> View Orders
          </button>
          <button onClick={() => navigate("/shop")} className="btn-primary flex items-center gap-2">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Orders List ──────────────────────────────────────────────────────────────
export function Orders() {
  const navigate = useNavigate();
  const { user } = useApp();
  const userOrders = orders.filter(o => o.userId === user?.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-display font-bold text-2xl text-gray-900 mb-7">My Orders</h1>
      {userOrders.length === 0 ? (
        <EmptyState icon={Package} title="No orders yet" message="You haven't placed any orders yet."
          action={{ label: "Start Shopping", fn: () => navigate("/shop") }} />
      ) : (
        <div className="space-y-4">
          {userOrders.map(order => (
            <div key={order.id} className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="font-bold text-gray-900 text-sm">{order.id}</span>
                  <span className="text-gray-500 text-xs ml-3">{order.date}</span>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <div className="space-y-2 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.name} ×{item.qty}</span>
                    <span className="font-medium text-gray-900">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-surface-border">
                <div>
                  <p className="text-xs text-gray-500">{order.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="font-bold text-gray-900">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Wishlist ─────────────────────────────────────────────────────────────────
export function Wishlist() {
  const navigate = useNavigate();
  const { wishlist } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-7">
        <Heart className="w-6 h-6 text-red-500" />
        <h1 className="font-display font-bold text-2xl text-gray-900">My Wishlist</h1>
        <span className="badge bg-red-100 text-red-600">{wishlist.length}</span>
      </div>
      {wishlist.length === 0 ? (
        <EmptyState icon={Heart} title="Your wishlist is empty"
          message="Save items you love to your wishlist and buy them later."
          action={{ label: "Browse Products", fn: () => navigate("/shop") }} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
