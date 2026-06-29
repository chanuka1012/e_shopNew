import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Package, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-5">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-gray-900 text-xl">ShopWave</span>
          </Link>
          <h1 className="font-display font-bold text-2xl text-gray-900 mb-1">{title}</h1>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
        <div className="card p-7">{children}</div>
      </div>
    </div>
  );
}

export function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name.split(" ")[0]}!`);
      navigate(result.user.role === "admin" ? "/admin" : from, { replace: true });
    } else {
      toast.error("Invalid email or password.");
    }
  };

  const demoLogin = async (role) => {
    const creds = role === "admin"
      ? { email: "admin@shopwave.com", password: "admin123" }
      : { email: "jane@example.com", password: "user123" };
    setEmail(creds.email); setPassword(creds.password);
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login(creds.email, creds.password);
    setLoading(false);
    if (result.success) {
      toast.success(`Signed in as ${result.user.name}!`);
      navigate(result.user.role === "admin" ? "/admin" : from, { replace: true });
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your ShopWave account">
      {/* Demo buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button onClick={() => demoLogin("user")}
          className="px-4 py-2.5 rounded-xl border-2 border-dashed border-primary-200 text-primary-700 text-xs font-semibold hover:bg-primary-50 transition-colors">
          👤 Demo User
        </button>
        <button onClick={() => demoLogin("admin")}
          className="px-4 py-2.5 rounded-xl border-2 border-dashed border-purple-200 text-purple-700 text-xs font-semibold hover:bg-purple-50 transition-colors">
          ⚙️ Demo Admin
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-border" /></div>
        <div className="relative text-center"><span className="bg-white px-3 text-xs text-gray-500">or sign in with email</span></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="input pl-9" placeholder="you@example.com" required />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
              className="input pl-9 pr-9" placeholder="••••••••" required />
            <button type="button" onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="btn-primary w-full py-3 flex items-center justify-center gap-2">
          {loading ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/><path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Signing in…</> : "Sign In"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-5">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">Create one</Link>
      </p>
    </AuthLayout>
  );
}

export function Register() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error("Passwords don't match"); return; }
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    // Simulate registration by logging in as the demo user
    const result = login("jane@example.com", "user123");
    setLoading(false);
    toast.success("Account created! Welcome to ShopWave 🎉");
    navigate("/");
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join 50,000+ shoppers on ShopWave">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              className="input pl-9" placeholder="John Doe" required />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              className="input pl-9" placeholder="you@example.com" required />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type={showPw ? "text" : "password"} value={form.password} onChange={e => setForm({...form, password: e.target.value})}
              className="input pl-9 pr-9" placeholder="Min 6 characters" required />
            <button type="button" onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})}
              className="input pl-9" placeholder="Repeat password" required />
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="btn-primary w-full py-3 flex items-center justify-center gap-2">
          {loading ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/><path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Creating account…</> : "Create Account"}
        </button>
        <p className="text-xs text-gray-500 text-center">
          By registering, you agree to our <a href="#" className="text-primary-600">Terms</a> and <a href="#" className="text-primary-600">Privacy Policy</a>.
        </p>
      </form>
      <p className="text-center text-sm text-gray-600 mt-5">
        Already have an account?{" "}
        <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">Sign in</Link>
      </p>
    </AuthLayout>
  );
}
