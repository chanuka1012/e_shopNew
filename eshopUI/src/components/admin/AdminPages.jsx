import { useState } from "react";
import { Link, useNavigate, useLocation, Outlet, Navigate } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut,
  TrendingUp, DollarSign, Bell, Menu, X, ChevronRight, Pencil, Trash2,
  Plus, Search, Eye, BarChart3
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import { StatCard, StatusBadge, Modal } from "../ui";
import { products, orders, users, stats, revenueChart } from "../../data/mockData";
import toast from "react-hot-toast";

// ─── Admin Guard ──────────────────────────────────────────────────────────────
export function AdminGuard({ children }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;
  return children;
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const { logout, user } = useApp();
  const navigate = useNavigate();
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-dark-900 z-40 flex flex-col transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-dark-700">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-white text-base">ShopWave</span>
            <span className="text-xs text-primary-400 font-semibold">Admin</span>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to || (to !== "/admin" && location.pathname.startsWith(to));
            return (
              <Link key={to} to={to} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${active ? "bg-primary-600 text-white" : "text-gray-400 hover:bg-dark-700 hover:text-white"}`}>
                <Icon className="w-4 h-4" />{label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-dark-700 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 mb-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">{user?.avatar}</div>
            <div className="min-w-0"><p className="text-white text-sm font-medium truncate">{user?.name}</p><p className="text-xs text-gray-500">Administrator</p></div>
          </div>
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-dark-700 hover:text-white transition-all">
            <Eye className="w-4 h-4" /> View Store
          </Link>
          <button onClick={() => { logout(); navigate("/"); toast.success("Signed out"); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-all w-full">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Admin Layout ─────────────────────────────────────────────────────────────
export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-surface-secondary">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="lg:ml-60">
        <header className="bg-white border-b border-surface-border h-16 flex items-center px-4 sm:px-6 gap-4 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden btn-ghost p-2">
            <Menu className="w-5 h-5" />
          </button>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input placeholder="Search…" className="input pl-9 py-2 text-sm" />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="relative btn-ghost p-2">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export function AdminDashboard() {
  const maxRevenue = Math.max(...revenueChart.map(r => r.revenue));
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-0.5">Welcome back! Here's what's happening.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} growth={stats.revenueGrowth} color="primary" />
        <StatCard icon={ShoppingBag} label="Total Orders" value={stats.orders} growth={stats.ordersGrowth} color="green" />
        <StatCard icon={Users} label="Customers" value={stats.customers.toLocaleString()} growth={stats.customersGrowth} color="purple" />
        <StatCard icon={Package} label="Products" value={stats.products} color="amber" />
      </div>

      {/* Revenue Chart (pure CSS) */}
      <div className="card p-6">
        <h2 className="font-semibold text-gray-900 mb-5">Revenue Overview (2025)</h2>
        <div className="flex items-end gap-3 h-40">
          {revenueChart.map((m, i) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-xs text-gray-500">${(m.revenue/1000).toFixed(0)}k</span>
              <div
                className={`w-full rounded-t-lg transition-all duration-500 ${i === revenueChart.length - 1 ? "bg-primary-600" : "bg-primary-200"}`}
                style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
              />
              <span className="text-xs font-medium text-gray-600">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Orders */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs text-primary-600 font-medium hover:text-primary-700">View all</Link>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 4).map(o => (
              <div key={o.id} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 text-xs font-bold">
                  {o.id.slice(-2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{o.id}</p>
                  <p className="text-xs text-gray-500 truncate">{o.items.map(i=>i.name).join(", ")}</p>
                </div>
                <StatusBadge status={o.status} />
                <span className="text-sm font-bold text-gray-900 shrink-0">${o.total.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Top Products */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Top Products</h2>
            <Link to="/admin/products" className="text-xs text-primary-600 font-medium hover:text-primary-700">View all</Link>
          </div>
          <div className="space-y-3">
            {products.sort((a,b) => b.sold - a.sold).slice(0, 4).map(p => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                    <div className="bg-primary-600 h-1.5 rounded-full" style={{ width: `${Math.min((p.sold/120000)*100,100)}%` }} />
                  </div>
                </div>
                <span className="text-xs text-gray-500 shrink-0">{p.sold.toLocaleString()} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Products ───────────────────────────────────────────────────────────
export function AdminProducts() {
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm">{products.length} total products</p>
        </div>
        <button onClick={() => toast.success("Product form would open here!")} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-surface-border">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products…" className="input pl-9 text-sm" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-border bg-surface-secondary">
                {["Product", "Category", "Price", "Stock", "Sold", "Rating", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-surface-secondary transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-medium text-gray-900 text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="badge bg-gray-100 text-gray-700">{p.category}</span></td>
                  <td className="px-4 py-3 font-semibold text-gray-900 text-sm">${p.price}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${p.stock <= 8 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{p.stock}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{p.sold.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-600 text-sm">⭐ {p.rating}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setEditModal(p); toast("Edit form would open here", {icon:"✏️"}); }}
                        className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteModal(p)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Delete Product">
        <p className="text-gray-600 text-sm mb-5">Are you sure you want to delete <strong>{deleteModal?.name}</strong>? This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={() => setDeleteModal(null)} className="btn-secondary flex-1">Cancel</button>
          <button onClick={() => { toast.success(`${deleteModal.name} deleted!`); setDeleteModal(null); }}
            className="flex-1 px-5 py-2.5 bg-red-600 text-white rounded-xl font-semibold text-sm hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

// ─── Admin Orders ─────────────────────────────────────────────────────────────
export function AdminOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = orders.filter(o =>
    (statusFilter === "all" || o.status === statusFilter) &&
    (o.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900">Orders</h1>
        <p className="text-gray-500 text-sm">{orders.length} total orders</p>
      </div>
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-surface-border flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search order ID…" className="input pl-9 text-sm w-48" />
          </div>
          <div className="flex gap-2">
            {["all","pending","processing","shipped","delivered","cancelled"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border
                  ${statusFilter === s ? "bg-primary-600 text-white border-primary-600" : "border-surface-border text-gray-600 hover:border-primary-300"}`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-border bg-surface-secondary">
                {["Order ID", "Date", "Items", "Address", "Total", "Status", "Action"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-surface-secondary transition-colors">
                  <td className="px-4 py-3 font-bold text-primary-600 text-sm">{o.id}</td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{o.date}</td>
                  <td className="px-4 py-3 text-gray-700 text-sm max-w-[180px]">
                    <span className="truncate block">{o.items.map(i=>i.name).join(", ")}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs max-w-[150px]">
                    <span className="truncate block">{o.address}</span>
                  </td>
                  <td className="px-4 py-3 font-bold text-gray-900">${o.total.toFixed(2)}</td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3">
                    <button onClick={() => toast(`Update status for ${o.id}`, {icon: "📦"})}
                      className="text-xs text-primary-600 font-semibold hover:text-primary-700">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Customers ──────────────────────────────────────────────────────────
export function AdminCustomers() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900">Customers</h1>
        <p className="text-gray-500 text-sm">{users.length} registered users</p>
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-border bg-surface-secondary">
                {["User", "Email", "Role", "Joined", "Orders", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {users.map(u => {
                const uOrders = orders.filter(o => o.userId === u.id);
                return (
                  <tr key={u.id} className="hover:bg-surface-secondary transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xs">{u.avatar}</div>
                        <span className="font-medium text-gray-900 text-sm">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-sm">{u.joined}</td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{uOrders.length}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toast(`View ${u.name}'s profile`, {icon:"👤"})}
                        className="text-xs text-primary-600 font-semibold hover:text-primary-700">View</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Analytics ──────────────────────────────────────────────────────────
export function AdminAnalytics() {
  const maxRevenue = Math.max(...revenueChart.map(r => r.revenue));
  const catRevenue = [
    { cat: "Electronics", value: 65, color: "bg-primary-500" },
    { cat: "Fashion", value: 20, color: "bg-indigo-400" },
    { cat: "Computers", value: 8, color: "bg-purple-400" },
    { cat: "Home", value: 5, color: "bg-amber-400" },
    { cat: "Cameras", value: 2, color: "bg-green-400" },
  ];
  return (
    <div className="space-y-5 animate-fade-in">
      <h1 className="font-display font-bold text-2xl text-gray-900">Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Monthly Revenue</h2>
          <div className="flex items-end gap-3 h-48">
            {revenueChart.map((m, i) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-gray-500">${(m.revenue/1000).toFixed(0)}k</span>
                <div
                  className={`w-full rounded-t-lg ${i === revenueChart.length-1 ? "bg-primary-600" : "bg-primary-200 hover:bg-primary-300"} transition-colors cursor-pointer`}
                  style={{ height: `${(m.revenue/maxRevenue)*100}%` }}
                />
                <span className="text-xs font-medium text-gray-600">{m.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Revenue by Category</h2>
          <div className="space-y-4">
            {catRevenue.map(c => (
              <div key={c.cat}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-gray-700">{c.cat}</span>
                  <span className="text-gray-500">{c.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className={`${c.color} h-2.5 rounded-full transition-all duration-700`} style={{ width: `${c.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6 lg:col-span-2">
          <h2 className="font-semibold text-gray-900 mb-5">Order Status Breakdown</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[["pending","Pending","amber"],["processing","Processing","blue"],["shipped","Shipped","indigo"],["delivered","Delivered","green"],["cancelled","Cancelled","red"]].map(([status, label, color]) => {
              const count = orders.filter(o => o.status === status).length;
              return (
                <div key={status} className={`p-4 rounded-xl bg-${color}-50 text-center`}>
                  <p className={`text-2xl font-bold text-${color}-700 mb-1`}>{count}</p>
                  <p className={`text-xs font-semibold text-${color}-600`}>{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
