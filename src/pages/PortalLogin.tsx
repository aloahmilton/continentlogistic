import { useState, FormEvent } from "react";
import { Lock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const portalNames: Record<string, string> = {
  "myct-plus": "MyCT+",
  "express-commerce": "CT Express Commerce",
  "vantage": "CT Vantage",
  "mycti": "MyCTi",
  "mysupplychain": "MySupplyChain",
  "myct-gts": "MyCT GTS",
  "sameday": "CT SameDay",
  "lifetrack": "LifeTrack"
};

export default function PortalLogin() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const portalName = id ? (portalNames[id] || id.toUpperCase()) : "Customer Portal";

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      setLoading(false);
      if (email && password) {
        toast.success(`Welcome to ${portalName}`);
        navigate("/dashboard");
      } else {
        toast.error(`Invalid credentials for ${portalName}. Please contact your account manager.`);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center bg-muted/30 px-4 py-12">
        <div className="w-full max-w-md bg-background border rounded-lg shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-full brand-red-bg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-center">{portalName} Login</h1>
            <p className="text-sm text-muted-foreground text-center mt-2">Secure access for authorized logistics partners and businesses.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Business Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded border border-border focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded border border-border focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 brand-red-bg text-white rounded font-bold hover:brightness-110 transition-all shadow-md disabled:opacity-50 mt-4"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>
          
          <div className="mt-6 text-center space-y-3">
            <a href="/portal-register" className="block text-sm font-bold brand-red-text hover:underline">
              Don't have an account? Register your Business Account
            </a>
            <a href="/customer-service" className="block text-xs text-muted-foreground hover:brand-red-text transition-colors">
              Need help accessing your account?
            </a>
          </div>
          
          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Continental Track Logistics Group</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
