import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, ArrowLeft, Star, Package, Shield, Truck, RotateCcw, Plus, Minus, Check } from "lucide-react";
import { products } from "../data/mockData";
import { StarRating, ProductCard } from "../components/ui";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const product = products.find(p => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-center">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-3">Product not found</h2>
      <button onClick={() => navigate("/shop")} className="btn-primary">Back to Shop</button>
    </div>
  );

  const wished = isInWishlist(product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    toast.success(`${qty}× ${product.name} added to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-7 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Images */}
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50">
            <img src={product.images[activeImg] || product.image} alt={product.name}
              className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? "border-primary-500" : "border-surface-border"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="badge bg-primary-100 text-primary-700 mb-3">{product.category}</span>
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-3 leading-tight">{product.name}</h1>

          <StarRating rating={product.rating} reviews={product.reviews} size="md" />

          <div className="flex items-center gap-3 my-5">
            <span className="font-display font-bold text-3xl text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-gray-400 line-through text-lg">${product.originalPrice.toFixed(2)}</span>
                <span className="badge bg-red-100 text-red-600">Save {discount}%</span>
              </>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.tags.map(t => (
              <span key={t} className="badge bg-gray-100 text-gray-600 font-medium">{t}</span>
            ))}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-5">
            <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? "bg-green-500" : "bg-amber-500"}`} />
            <span className="text-sm font-medium text-gray-700">
              {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
            </span>
            <span className="text-gray-400 text-xs">· {product.sold.toLocaleString()} sold</span>
          </div>

          {/* Qty + CTA */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center border border-surface-border rounded-xl overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q-1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-700 transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-semibold text-sm">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q+1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-gray-700 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                ${added ? "bg-green-600 text-white" : "btn-primary"}`}>
              {added ? <><Check className="w-4 h-4" /> Added!</> : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>}
            </button>
            <button onClick={() => { toggleWishlist(product); toast(wished ? "Removed from wishlist" : "Added to wishlist!", { icon: wished ? "💔" : "❤️" }); }}
              className={`w-11 h-11 flex items-center justify-center rounded-xl border-2 transition-all
                ${wished ? "bg-red-50 border-red-300 text-red-500" : "border-surface-border text-gray-400 hover:border-red-300"}`}>
              <Heart className={`w-5 h-5 ${wished ? "fill-red-500" : ""}`} />
            </button>
          </div>

          <button onClick={() => { handleAddToCart(); setTimeout(() => navigate("/cart"), 300); }}
            className="w-full py-3 rounded-xl border-2 border-primary-600 text-primary-700 font-semibold text-sm hover:bg-primary-50 transition-colors mb-6">
            Buy Now
          </button>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {[[Truck, "Free Shipping", "Orders over $50"], [Shield, "2-Year Warranty", "Full coverage"], [RotateCcw, "30-Day Returns", "Hassle-free"]].map(([Icon, title, sub]) => (
              <div key={title} className="p-3 rounded-xl bg-surface-secondary">
                <Icon className="w-5 h-5 text-primary-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-gray-800">{title}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="font-display font-bold text-xl text-gray-900 mb-5">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
