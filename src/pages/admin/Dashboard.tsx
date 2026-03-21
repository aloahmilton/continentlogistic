import { useState, useEffect } from "react";
import { Package, Users, BarChart3, Clock } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { shipmentApi, leadApi } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { title: "Total Shipments", value: "...", icon: Package, color: "text-blue-600" },
    { title: "Active Leads", value: "...", icon: Users, color: "text-green-600" },
    { title: "In Transit", value: "...", icon: Clock, color: "text-yellow-600" },
    { title: "Delivered", value: "...", icon: BarChart3, color: "text-purple-600" },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [shipmentRes, leadRes] = await Promise.all([
          shipmentApi.getAll(),
          leadApi.getAll()
        ]);
        
        const shipments = shipmentRes.data || [];
        const leads = leadRes.data || [];
        
        setStats([
          { title: "Total Shipments", value: shipments.length.toString(), icon: Package, color: "text-blue-600" },
          { title: "Active Leads", value: leads.length.toString(), icon: Users, color: "text-green-600" },
          { title: "In Transit", value: shipments.filter((s: any) => s.status === 'in_transit').length.toString(), icon: Clock, color: "text-yellow-600" },
          { title: "Delivered", value: shipments.filter((s: any) => s.status === 'delivered').length.toString(), icon: BarChart3, color: "text-purple-600" },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 grid gap-4 md:grid-cols-2">
         {/* Recent activity could go here */}
      </div>
    </AdminLayout>
  );
}
