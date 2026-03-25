import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, Users, LayoutDashboard, Settings, LogOut, MapPin, FileText, BarChart, Truck, Menu, X, Bell, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const adminSlug = import.meta.env.VITE_ADMIN_SLUG || "admin";
  
  const userStr = localStorage.getItem("admin_user");
  const user = userStr ? JSON.parse(userStr) : { name: "Admin" };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_role");
    localStorage.removeItem("admin_user");
    window.location.href = `/${adminSlug}`;
  };

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: `/${adminSlug}` },
    { label: "Shipments", icon: Package, path: `/${adminSlug}/shipments` },
    { label: "Tracking Map", icon: MapPin, path: `/${adminSlug}/tracking-map` },
    { label: "Quote Requests", icon: Users, path: `/${adminSlug}/leads` },
    { label: "Customers", icon: Users, path: `/${adminSlug}/customers` },
    { label: "Drivers", icon: Truck, path: `/${adminSlug}/drivers` },
    { label: "Invoices", icon: FileText, path: `/${adminSlug}/invoices` },
    { label: "Reports", icon: BarChart, path: `/${adminSlug}/reports` },
    { label: "Messages", icon: MessageSquare, path: `/${adminSlug}/messages` },
    { label: "Admin Profile", icon: User, path: `/${adminSlug}/profile` },
    { label: "Settings", icon: Settings, path: `/${adminSlug}/settings` },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-muted/30 flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden h-16 border-b bg-background flex items-center justify-between px-4 sticky top-0 z-40">
        <Link to="/" className="text-lg font-bold brand-red-text">Continental Track</Link>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-background border-r flex flex-col transition-transform duration-300 transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}>
        <div className="p-6 border-b hidden md:block">
          <Link to="/" className="text-xl font-bold brand-red-text font-serif">CONTINENTAL TRACK</Link>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Admin Operations</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "brand-red-bg text-white shadow-sm" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-muted-foreground hover:text-destructive transition-colors font-bold uppercase tracking-tighter"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="hidden md:flex h-16 border-b bg-background items-center justify-between px-8 sticky top-0 z-30">
          <h1 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{title}</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-muted p-1 pr-3 rounded-full transition-colors outline-none cursor-pointer">
                <div className="w-8 h-8 rounded-full brand-red-bg flex items-center justify-center text-white">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-tighter">{user.name}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={`/${adminSlug}/profile`} className="cursor-pointer w-full flex items-center">
                    <User className="w-4 h-4 mr-2" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={`/${adminSlug}/settings`} className="cursor-pointer w-full flex items-center">
                    <Settings className="w-4 h-4 mr-2" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
