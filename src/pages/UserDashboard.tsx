import { useState } from "react";
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Settings, 
  Bell, 
  Search, 
  User as UserIcon,
  LogOut,
  ChevronRight,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const mockShipments = [
    { id: "CT849201", status: "In Transit", origin: "New York, USA", destination: "London, UK", lastUpdate: "Sorted at London Hub", date: "2026-03-21" },
    { id: "CT728103", status: "Delivered", origin: "Berlin, DE", destination: "Paris, FR", lastUpdate: "Delivered to Recipient", date: "2026-03-19" },
  ];

  const handleLogout = () => {
    toast.info("Logged out successfully");
    navigate("/portal-login");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 brand-gray-bg border-r border-border md:min-h-screen p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 brand-red-bg rounded-lg" />
          <span className="font-black text-xl tracking-tight">MYCT+</span>
        </div>

        <nav className="flex-1 space-y-1">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === "overview" ? "brand-red-bg text-white shadow-md" : "hover:bg-muted"}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Overview
          </button>
          <button 
            onClick={() => setActiveTab("shipments")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === "shipments" ? "brand-red-bg text-white shadow-md" : "hover:bg-muted"}`}
          >
            <Package className="w-4 h-4" /> My Shipments
          </button>
          <button 
            onClick={() => setActiveTab("invoices")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === "invoices" ? "brand-red-bg text-white shadow-md" : "hover:bg-muted"}`}
          >
            <FileText className="w-4 h-4" /> Billing & Invoices
          </button>
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === "settings" ? "brand-red-bg text-white shadow-md" : "hover:bg-muted"}`}
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-border/50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-muted-foreground hover:brand-red-text transition-colors"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Continental Track Client</h1>
            <p className="text-sm text-muted-foreground">Manage your global logistics operations from one place.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
            </button>
            <button className="flex items-center gap-2 p-1 pl-3 bg-background border rounded-full hover:shadow-md transition-all">
              <span className="text-sm font-medium">Business Account</span>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <UserIcon className="w-4 h-4" />
              </div>
            </button>
          </div>
        </header>

        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="p-6 bg-background border rounded-xl hover:shadow-xl transition-all text-left flex flex-col gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold underline md:no-underline md:group-hover:underline">Ship Now</h3>
                  <p className="text-xs text-muted-foreground">Create a new international shipment.</p>
                </div>
              </button>
              <button className="p-6 bg-background border rounded-xl hover:shadow-xl transition-all text-left flex flex-col gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold underline md:no-underline md:group-hover:underline">Global Search</h3>
                  <p className="text-xs text-muted-foreground">Find shipments, invoices, or help.</p>
                </div>
              </button>
              <button className="p-6 bg-background border rounded-xl hover:shadow-xl transition-all text-left flex flex-col gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold underline md:no-underline md:group-hover:underline">Reports</h3>
                  <p className="text-xs text-muted-foreground">Analyze your shipping performance.</p>
                </div>
              </button>
            </div>

            {/* Recent Shipments */}
            <div className="bg-background border rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="font-bold">Active Shipments</h2>
                <button className="text-xs brand-red-text font-bold hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 text-xs font-bold uppercase text-muted-foreground">
                    <tr>
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Route</th>
                      <th className="px-6 py-4">Last Update</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mockShipments.map((s) => (
                      <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-sm tracking-tighter">{s.id}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${s.status === "In Transit" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span>{s.origin.split(',')[1]}</span>
                            <ArrowRight className="w-3 h-3 text-muted-foreground" />
                            <span>{s.destination.split(',')[1]}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-muted-foreground">{s.lastUpdate}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-xs brand-red-text hover:underline font-bold">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs placeholders */}
        {activeTab !== "overview" && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <LayoutDashboard className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold capitalize">{activeTab} section coming soon</h2>
            <p className="text-sm text-muted-foreground mt-2">We are finalizing this module for your business account.</p>
          </div>
        )}
      </main>
    </div>
  );
}
