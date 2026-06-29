import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// ─── Star Rating ──────────────────────────────────────────────────────────────
export function StarRating({ rating, reviews, size = "sm" }) {
  const s = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1,2,3,4,5].map(n => (
          <Star key={n} className={`${s} ${n <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
        ))}
      </div>
      <span className="text-xs text-gray-500 font-medium">
        {rating} {reviews && `(${reviews.toLocaleString()})`}
      </span>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
export function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const navigate = useNavigate();
  const wished = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="card group hover:shadow-card-hover transition-all duration-300 overflow-hidden animate-fade-in flex flex-col">
      <div className="relative overflow-hidden bg-gray-50 h-52">
        <img
          src={product.image} alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        />
        {discount && (
          <span className="absolute top-3 left-3 badge bg-red-100 text-red-600">
            -{discount}%
          </span>
        )}
        {product.stock <= 8 && (
          <span className="absolute top-3 right-3 badge bg-amber-100 text-amber-700">
            Only {product.stock} left
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => { addToCart(product); toast.success(`${product.name} added to cart!`); }}
            className="flex-1 flex items-center justify-center gap-1.5 bg-white text-gray-900 font-semibold text-xs py-2 rounded-lg shadow-md hover:bg-primary-600 hover:text-white transition-all duration-200"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
          </button>
          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-1">{product.category}</span>
        <h3
          className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 cursor-pointer hover:text-primary-600 transition-colors leading-snug"
          onClick={() => navigate(`/product/${product.id}`)}
        >{product.name}</h3>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <div className="flex items-center justify-between mt-auto pt-3">
          <div>
            <span className="font-bold text-gray-900 text-base">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1.5">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() => { toggleWishlist(product); toast(wished ? "Removed from wishlist" : "Added to wishlist!", { icon: wished ? "💔" : "❤️" }); }}
            className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200
              ${wished ? "bg-red-50 border-red-200 text-red-500" : "border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400"}`}
          >
            <Heart className={`w-4 h-4 ${wished ? "fill-red-500" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
export function StatusBadge({ status }) {
  const map = {
    pending:    "bg-amber-100 text-amber-700",
    processing: "bg-blue-100 text-blue-700",
    shipped:    "bg-indigo-100 text-indigo-700",
    delivered:  "bg-green-100 text-green-700",
    cancelled:  "bg-red-100 text-red-600",
  };
  return (
    <span className={`badge ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// ─── Loading Spinner ──────────────────────────────────────────────────────────
export function Spinner({ className = "w-6 h-6" }) {
  return (
    <svg className={`animate-spin text-primary-600 ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-primary-400" />
      </div>
      <h3 className="font-semibold text-gray-900 text-lg mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-5 max-w-xs">{message}</p>
      {action && (
        <button onClick={action.fn} className="btn-primary">{action.label}</button>
      )}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative card p-6 w-full max-w-md animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900 text-lg">{title}</h2>
          <button onClick={onClose} className="btn-ghost w-8 h-8 p-0 flex items-center justify-center">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
export function StatCard({ icon: Icon, label, value, growth, color = "primary" }) {
  const colors = {
    primary: "bg-primary-50 text-primary-600",
    green:   "bg-green-50 text-green-600",
    amber:   "bg-amber-50 text-amber-600",
    purple:  "bg-purple-50 text-purple-600",
  };
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {growth !== undefined && (
          <span className={`badge text-xs ${growth >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
            {growth >= 0 ? "↑" : "↓"} {Math.abs(growth)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-0.5">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}
