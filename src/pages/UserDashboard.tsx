import { useState, useEffect } from "react";
import { 
  BarChart3, 
  Package, 
  Settings, 
  LogOut, 
  Bell, 
  User as UserIcon, 
  FileText, 
  Shield, 
  Mail, 
  Save, 
  Phone,
  MessageSquare,
  Clock,
  ArrowRight,
  Plus,
  FileText as FileTextIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { shipmentApi, invoiceApi, messageApi } from "@/lib/api";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [shipments, setShipments] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user_auth");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      fetchDashboardData(userData.id || userData.email);
    } else {
      navigate("/portal-login");
    }
  }, []);

  const fetchDashboardData = async (userId: string) => {
    try {
      setLoading(true);
      // In a real app, these would filter by user ID on the backend
      const [shipRes, invRes, msgRes] = await Promise.all([
        shipmentApi.getAll(),
        invoiceApi.getAll(),
        messageApi.getAll()
      ]);
      
      // Filter for demo purposes (ideally backend does this)
      setShipments(shipRes.data || []);
      setInvoices(invRes.data.filter((i: any) => i.customerName === user?.email || i.customer === user?.email) || []);
      setMessages(msgRes.data || []);
      
    } catch (error) {
      console.error("Dashboard data fetch error:", error);
      toast.error("Failed to sync dashboard with database");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_auth");
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
            <BarChart3 className="w-4 h-4" /> Overview
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
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors relative ${activeTab === "messages" ? "brand-red-bg text-white shadow-md" : "hover:bg-muted"}`}
          >
            <MessageSquare className="w-4 h-4" /> Messages
            <span className="absolute top-2 right-2 w-4 h-4 bg-white text-primary text-[8px] flex items-center justify-center rounded-full font-black">2</span>
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

        {activeTab === "invoices" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Pending Invoices
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Invoice #</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {invoices.length > 0 ? invoices.map((inv) => (
                      <tr key={inv._id} className="hover:bg-muted/30">
                        <td className="px-6 py-4 font-bold text-sm">{inv.invoiceNumber || inv._id}</td>
                        <td className="px-6 py-4 font-black">${inv.amount?.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            inv.status === 'paid' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-xs font-bold brand-red-text hover:underline uppercase tracking-tighter">View Details</button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground text-sm font-bold uppercase tracking-widest">No invoices found in database</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Payment Instructions</h3>
                <div className="bg-muted/30 p-4 rounded-lg border border-dashed border-border">
                  <p className="text-xs whitespace-pre-line leading-relaxed">
                    Please make payment via Bank Transfer:{"\n"}
                    Bank: International Logistics Bank{"\n"}
                    Account: 0099887766{"\n"}
                    Swift: ILBGB2L{"\n\n"}
                    After payment, please upload a screenshot of your receipt below.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Upload Multi-Proof</h3>
                <p className="text-[10px] text-muted-foreground mb-4 font-medium uppercase tracking-tighter">Please upload your payment screenshot or receipt (PNG, JPG, PDF)</p>
                <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-sm">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Select Image</p>
                  <input type="file" className="hidden" id="proof-upload" />
                </div>
                <Button className="w-full mt-4 brand-red-bg hover:opacity-90 font-bold uppercase tracking-widest text-xs h-10" onClick={() => toast.success("Payment proof uploaded! Admin will verify soon.")}>
                  Submit Payment Verification
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "shipments" && (
          <div className="bg-background border rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="font-bold uppercase tracking-widest text-sm">Full Shipment History</h2>
              <div className="flex gap-2">
                 <Input placeholder="Search shipments..." className="h-8 w-64 text-xs" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-muted/50 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Tracking ID</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Origin</th>
                    <th className="px-6 py-4">Destination</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {shipments.length > 0 ? shipments.map((s) => (
                    <tr key={s._id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-sm">{s.trackingNumber}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-primary/5 text-primary border border-primary/20">
                          {s.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs">{s.origin}</td>
                      <td className="px-6 py-4 text-xs">{s.destination}</td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">{new Date(s.createdAt || Date.now()).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-xs font-bold brand-red-text hover:underline uppercase tracking-tighter">View Track</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground text-sm font-bold uppercase tracking-widest">No shipments found in database</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="max-w-4xl space-y-4">
            {messages.length > 0 ? messages.map((msg) => (
              <div key={msg._id} className={`p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md bg-white ${msg.status === 'unread' ? 'border-primary/30 shadow-sm' : 'border-border/50'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.status === 'unread' ? 'brand-red-bg text-white' : 'bg-muted text-muted-foreground'}`}>
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-tighter">{msg.sender?.name || (msg.type === 'admin' ? 'System Dispatch' : 'Internal')}</p>
                      <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {msg.status === 'unread' && <span className="bg-primary text-white text-[8px] px-1.5 rounded-full font-black uppercase tracking-widest">New</span>}
                </div>
                <h3 className="font-bold text-sm mb-1">{msg.subject}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1 mb-3">{msg.message}</p>
                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-1 hover:gap-2 transition-all">
                  Read Message <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )) : (
              <div className="bg-white p-10 rounded-xl border border-dashed border-border text-center">
                <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">No messages in your inbox</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-4xl space-y-6">
            <div className="bg-white p-8 rounded-xl border border-border shadow-sm">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full brand-red-bg flex items-center justify-center text-white text-2xl font-black">
                  CT
                </div>
                <div>
                  <h2 className="text-xl font-bold">Continental Track Client</h2>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Business Account #CT-9922</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <input className="w-full pl-10 pr-4 py-2 bg-muted/20 border border-border rounded-md text-sm outline-none focus:border-primary transition-colors" defaultValue="Continental Track Client" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <input className="w-full pl-10 pr-4 py-2 bg-muted/20 border border-border rounded-md text-sm outline-none focus:border-primary transition-colors" defaultValue="client@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <input className="w-full pl-10 pr-4 py-2 bg-muted/20 border border-border rounded-md text-sm outline-none focus:border-primary transition-colors" defaultValue="+1 234 567 890" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Account Shield</label>
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded-md border border-green-100">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-bold text-green-700 uppercase tracking-tighter">Two-Factor Enabled</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t flex justify-end">
                <button 
                  onClick={() => toast.success("Profile settings updated")}
                  className="flex items-center gap-2 px-6 py-2 brand-red-bg text-white rounded-md text-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
                >
                  <Save className="w-4 h-4" /> Save General Settings
                </button>
              </div>
            </div>
          </div>
        ) || null}

        {/* Other tabs placeholders */}
        {activeTab === "invoices" && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-dashed border-border">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-bold">No Invoices Found</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">Your billing history will appear here once you make your first shipment.</p>
          </div>
        )}
      </main>
    </div>
  );
}
