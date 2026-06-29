import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Star, Zap, TrendingUp } from "lucide-react";
import { products, categories } from "../data/mockData";
import { ProductCard } from "../components/ui";

const featured = products.filter(p => p.featured);
const TESTIMONIALS = [
  { name: "Sarah Mitchell", role: "Verified Buyer", avatar: "SM", rating: 5, text: "Absolutely seamless shopping experience. Items arrived perfectly packed and exactly as described. ShopWave has become my go-to!" },
  { name: "James Park", role: "Verified Buyer", avatar: "JP", rating: 5, text: "The product quality is outstanding and the customer service is top-notch. Fast delivery and easy returns. Highly recommend." },
  { name: "Priya Sharma", role: "Verified Buyer", avatar: "PS", rating: 5, text: "Best prices I've found anywhere. The search filters make it super easy to find exactly what I need. 10/10 experience." },
];

const FEATURES = [
  { icon: Truck, title: "Free Shipping", desc: "On all orders over $50. Fast & reliable delivery to your door.", color: "bg-blue-50 text-blue-600" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "Your data is protected with 256-bit SSL encryption.", color: "bg-green-50 text-green-600" },
  { icon: RefreshCw, title: "Easy Returns", desc: "30-day hassle-free returns. No questions asked.", color: "bg-purple-50 text-purple-600" },
  { icon: Zap, title: "24/7 Support", desc: "Our team is here for you around the clock.", color: "bg-amber-50 text-amber-600" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-700 to-primary-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="badge bg-primary-500/20 text-primary-300 border border-primary-500/30 px-3 py-1.5">
                🔥 Summer Sale — Up to 40% off
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
              Shop Smarter,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-300">
                Live Better.
              </span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              Thousands of premium products, curated for people who know quality. From electronics to fashion — everything you need, at prices you'll love.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate("/shop")} className="btn-primary flex items-center gap-2 px-6 py-3 text-base">
                Shop Now <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate("/shop?cat=Electronics")} className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 px-6 py-3 text-base">
                Explore Electronics
              </button>
            </div>
            <div className="flex items-center gap-6 mt-10">
              {[["50K+", "Happy Customers"], ["10K+", "Products"], ["4.9★", "Avg. Rating"]].map(([val, lab]) => (
                <div key={lab}>
                  <div className="font-display font-bold text-xl text-white">{val}</div>
                  <div className="text-gray-400 text-xs">{lab}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="bg-white border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.slice(1).map(cat => (
              <button
                key={cat}
                onClick={() => navigate(`/shop?cat=${cat}`)}
                className="flex-shrink-0 px-4 py-2 rounded-xl border border-surface-border text-sm font-medium text-gray-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 bg-white"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="card p-5 flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${f.color}`}>
                <f.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-end justify-between mb-7">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">Trending Now</span>
            </div>
            <h2 className="font-display font-bold text-2xl text-gray-900">Featured Products</h2>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-primary-600 to-indigo-600 p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-3xl mb-2">Ready to shop smarter?</h2>
            <p className="text-primary-100">Join 50,000+ shoppers who trust ShopWave for their daily needs.</p>
          </div>
          <button onClick={() => navigate("/register")}
            className="flex-shrink-0 bg-white text-primary-700 font-bold px-7 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-lg">
            Create Free Account
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-surface-secondary border-y border-surface-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-1">
              {[1,2,3,4,5].map(n => <Star key={n} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              <span className="ml-2 text-sm text-gray-600 font-medium">4.9 out of 5 (12,000+ reviews)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="card p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(n => <Star key={n} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xs">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
