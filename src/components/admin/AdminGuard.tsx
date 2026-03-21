import { useState, useEffect, ReactNode } from "react";
import { Lock, User, KeyRound } from "lucide-react";
import { authApi } from "@/lib/api";
import { toast } from "sonner";

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
    }
    setCheckLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      const { token, user } = response.data;
      
      if (user.role === 'admin' || user.role === 'super_admin') {
        localStorage.setItem("admin_token", token);
        localStorage.setItem("admin_role", user.role === 'super_admin' ? 'super' : 'admin');
        localStorage.setItem("admin_user", JSON.stringify(user));
        setIsAuthenticated(true);
        toast.success(`Welcome back, ${user.name}`);
      } else {
        toast.error("Access denied. You do not have administrative privileges.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkLoading) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <div className="w-full max-w-md bg-background border rounded-lg shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-full brand-red-bg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold font-serif tracking-tight">Admin Portal</h1>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-1">Management Authentication</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded border border-border bg-white font-medium focus:ring-2 focus:ring-primary outline-none transition-all"
                  required
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Secret Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded border border-border bg-white font-medium focus:ring-2 focus:ring-primary outline-none transition-all"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 brand-red-bg text-white rounded font-black uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest leading-loose">
              Continental Track Logistics Group<br/>
              SECURE MANAGEMENT SESSION
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
