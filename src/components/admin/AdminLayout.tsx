import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, Users, LayoutDashboard, Settings, LogOut } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const location = useLocation();
  const adminSlug = import.meta.env.VITE_ADMIN_SLUG || "admin";

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: `/${adminSlug}` },
    { label: "Shipments", icon: Package, path: `/${adminSlug}/shipments` },
    { label: "Leads", icon: Users, path: `/${adminSlug}/leads` },
    { label: "Settings", icon: Settings, path: `/${adminSlug}/settings` },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r flex flex-col">
        <div className="p-6 border-b">
          <Link to="/" className="text-xl font-bold brand-red-text">Continental Track</Link>
          <p className="text-xs text-muted-foreground">Admin Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-background flex items-center px-8">
          <h1 className="text-lg font-semibold">{title}</h1>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
