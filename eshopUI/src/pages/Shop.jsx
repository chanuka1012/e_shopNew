import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Search, X, ChevronDown } from "lucide-react";
import { products, categories } from "../data/mockData";
import { ProductCard, EmptyState } from "../components/ui";
import { useApp } from "../context/AppContext";
import { Package } from "lucide-react";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
  { value: "newest", label: "Newest" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery, setSearch } = useApp();
  const [category, setCategory] = useState(searchParams.get("cat") || "All");
  const [sort, setSort] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [localQ, setLocalQ] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const cat = searchParams.get("cat") || "All";
    setLocalQ(q);
    setSearch(q);
    setCategory(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "All") list = list.filter(p => p.category === category);
    if (localQ.trim()) {
      const q = localQ.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sort) {
      case "price-asc":  list.sort((a,b) => a.price - b.price); break;
      case "price-desc": list.sort((a,b) => b.price - a.price); break;
      case "rating":     list.sort((a,b) => b.rating - a.rating); break;
      default: break;
    }
    return list;
  }, [category, localQ, priceRange, sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(prev => { if (localQ) prev.set("q", localQ); else prev.delete("q"); return prev; });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-7">
        <h1 className="font-display font-bold text-2xl text-gray-900 mb-1">
          {category === "All" ? "All Products" : category}
        </h1>
        <p className="text-gray-500 text-sm">{filtered.length} products found</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 min-w-[200px] max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={localQ}
              onChange={e => setLocalQ(e.target.value)}
              placeholder="Search products…"
              className="input pl-9 pr-9"
            />
            {localQ && (
              <button type="button" onClick={() => { setLocalQ(""); setSearch(""); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Category */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button key={cat}
              onClick={() => { setCategory(cat); setSearchParams(prev => { cat === "All" ? prev.delete("cat") : prev.set("cat", cat); return prev; }); }}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all border
                ${category === cat ? "bg-primary-600 text-white border-primary-600" : "bg-white text-gray-600 border-surface-border hover:border-primary-300"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="relative ml-auto">
          <select
            value={sort} onChange={e => setSort(e.target.value)}
            className="input py-2 pr-8 text-sm appearance-none cursor-pointer w-48"
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Filter toggle */}
        <button onClick={() => setFilterOpen(!filterOpen)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-medium transition-all
            ${filterOpen ? "bg-primary-50 border-primary-300 text-primary-700" : "bg-white border-surface-border text-gray-600"}`}>
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Filter Panel */}
      {filterOpen && (
        <div className="card p-5 mb-6 animate-slide-up">
          <h3 className="font-semibold text-gray-900 text-sm mb-4">Price Range</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Min ($)</label>
              <input type="number" value={priceRange[0]} min={0} max={priceRange[1]}
                onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                className="input py-2" />
            </div>
            <span className="text-gray-400 mt-4">—</span>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Max ($)</label>
              <input type="number" value={priceRange[1]} min={priceRange[0]} max={5000}
                onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                className="input py-2" />
            </div>
            <button onClick={() => setPriceRange([0, 3000])}
              className="btn-ghost mt-4 text-xs">Reset</button>
          </div>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState icon={Package} title="No products found"
          message="Try adjusting your search or filters to find what you're looking for."
          action={{ label: "Clear filters", fn: () => { setLocalQ(""); setCategory("All"); setSort("featured"); setPriceRange([0, 3000]); }}}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
