import { Link } from "react-router-dom";
import { Package, Share2, Code2, Camera, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">ShopWave</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Curated products, seamless shopping. Your one-stop destination for premium goods.
            </p>
            <div className="flex gap-3">
              {[Share2, Code2, Camera, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-dark-700 flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Icon className="w-4 h-4 text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Shop", links: ["All Products", "Electronics", "Fashion", "Home", "Cameras"] },
            { title: "Support", links: ["Help Center", "Track Order", "Returns", "Shipping Info"] },
            { title: "Company", links: ["About Us", "Careers", "Press", "Privacy Policy"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm hover:text-white transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-dark-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs">© 2025 ShopWave. All rights reserved.</p>
          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
