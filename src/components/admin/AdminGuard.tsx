import { useState, useEffect, ReactNode } from "react";
import { Lock } from "lucide-react";

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin_password_123";

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === adminPassword) {
      setIsAuthenticated(true);
    }
  }, [adminPassword]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      localStorage.setItem("admin_auth", password);
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <div className="w-full max-w-md bg-background border rounded-lg shadow-xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-full brand-red-bg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Admin Authentication</h1>
            <p className="text-sm text-muted-foreground">Please enter your password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded border font-medium focus:ring-2 focus:ring-primary outline-none transition-all ${
                  error ? "border-red-500 bg-red-50" : "border-border"
                }`}
                autoFocus
              />
              {error && <p className="text-xs text-red-500 mt-1 font-bold">Invalid password. Access denied.</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 brand-red-bg text-white rounded font-bold hover:brightness-110 transition-all shadow-lg"
            >
              Sign In to Dashboard
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Continental Track Logistics Group</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
