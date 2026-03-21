import { useState, useEffect } from "react";
import { Package, Users, BarChart3, Clock } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { shipmentApi, leadApi, driverApi, invoiceApi, messageApi } from "@/lib/api";
import { Truck, FileText, MessageSquare, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [shipmentRes, leadRes, driverRes, invoiceRes, messageRes] = await Promise.all([
          shipmentApi.getAll(),
          leadApi.getAll(),
          driverApi.getAll(),
          invoiceApi.getAll(),
          messageApi.getAll()
        ]);
        
        const shipments = shipmentRes.data || [];
        const leads = leadRes.data || [];
        const drivers = driverRes.data || [];
        const invoices = invoiceRes.data || [];
        const messages = messageRes.data || [];
        
        setStats([
          { title: "Total Shipments", value: shipments.length.toString(), icon: Package, color: "text-blue-600", desc: "Across all regions" },
          { title: "Active Leads", value: leads.length.toString(), icon: Users, color: "text-emerald-600", desc: "New quote requests" },
          { title: "Fleet Size", value: drivers.length.toString(), icon: Truck, color: "text-orange-600", desc: "Registered drivers" },
          { title: "Revenue", value: `$${invoices.reduce((acc: number, inv: any) => acc + (inv.amount || 0), 0).toLocaleString()}`, icon: TrendingUp, color: "text-primary", desc: "Total invoiced" },
          { title: "Pending Invoices", value: invoices.filter((i: any) => i.status === 'pending').length.toString(), icon: FileText, color: "text-yellow-600", desc: "Awaiting payment" },
          { title: "Unread Messages", value: messages.filter((m: any) => m.status === 'unread').length.toString(), icon: MessageSquare, color: "text-red-600", desc: "System alerts" },
          { title: "In Transit", value: shipments.filter((s: any) => s.status === 'in_transit').length.toString(), icon: Clock, color: "text-sky-600", desc: "Active movements" },
          { title: "Delivered", value: shipments.filter((s: any) => s.status === 'delivered').length.toString(), icon: BarChart3, color: "text-indigo-600", desc: "Completed orders" },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array(8).fill(0).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-16 bg-muted/50"></CardHeader>
              <CardContent className="h-12 bg-muted/30"></CardContent>
            </Card>
          ))
        ) : (
          stats.map((stat) => (
            <Card key={stat.title} className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black font-serif">{stat.value}</div>
                <p className="text-[9px] text-muted-foreground mt-1 font-bold uppercase tracking-tighter">{stat.desc}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      <div className="mt-8 grid gap-4 md:grid-cols-2">
         {/* Recent activity could go here */}
      </div>
    </AdminLayout>
  );
}
