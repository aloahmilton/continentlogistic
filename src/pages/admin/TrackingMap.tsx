import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Package, Truck, Info, Search, Filter, MapPin as MapPinIcon, Maximize2, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { shipmentApi } from "@/lib/api";

// Fix Leaflet icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const truckIcon = L.divIcon({
  className: "bg-primary w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white",
  html: `<div class="relative"><div class="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18h3a5 5 0 0 0 5-5V9a1 1 0 0 0-1-1h-3.5a1 1 0 0 1-1-1V5a1 1 0 0 0-1-1H12"/><path d="M3 18h2"/><circle cx="7.5" cy="18.5" r="2.5"/><path d="M10 18h4"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Mock active shipments for the map


export default function AdminTrackingMap() {
  const [searchTerm, setSearchTerm] = useState("");
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await shipmentApi.getAll();
      // Filter for active/recent shipments if needed, or just show all
      setShipments(response.data || []);
    } catch (error) {
      toast.error("Failed to load map data");
    } finally {
      setLoading(false);
    }
  };

  const filtered = shipments.filter(s => 
    s.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s.receiver?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.currentLocation || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Global Fleet Monitor">
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 max-w-sm w-full">
            <Input 
              placeholder="Search tracking ID or customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10"
            />
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
              <Search className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-10 px-4 bg-muted/20 border-border font-bold text-xs uppercase tracking-widest">
              Live: {filtered.length} Active Shipments
            </Badge>
            <Button variant="outline" size="sm" onClick={() => toast.success("Refreshing fleet data...")}>
              <RefreshCw className="w-4 h-4 mr-2" /> Sync
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="w-4 h-4 mr-2" /> Fullscreen
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" /> All Regions
            </Button>
          </div>
        </div>

        <div className="flex-1 rounded-xl overflow-hidden border border-border shadow-md bg-white">
          <MapContainer 
            center={[40, 0]} 
            zoom={2} 
            className="w-full h-full z-0"
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filtered.map((shipment) => {
              const coords = shipment.coordinates?.lat ? [shipment.coordinates.lat, shipment.coordinates.lng] : [0, 0];
              const history = (shipment.updates || [])
                .filter((u: any) => u.coordinates?.lat)
                .map((u: any) => [u.coordinates.lat, u.coordinates.lng]);
              
              if (coords[0] === 0 && history.length === 0) return null;

              return (
                <div key={shipment._id}>
                  {history.length > 1 && (
                    <Polyline 
                      positions={history as any} 
                      color="#E31E24" 
                      weight={3} 
                      opacity={0.6} 
                      dashArray="5, 8" 
                    />
                  )}
                  <Marker position={coords as any} icon={truckIcon}>
                    <Popup className="custom-popup">
                      <div className="p-1">
                        <div className="flex justify-between items-start mb-2 gap-4">
                          <div className="bg-primary/5 p-2 rounded">
                            <Truck className="w-4 h-4 text-primary" />
                          </div>
                          <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest border-primary/30 text-primary uppercase">
                            {shipment.status?.replace('_', ' ')}
                          </Badge>
                        </div>
                        <h4 className="font-bold text-sm tracking-tight">{shipment.trackingNumber}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter mb-2">{shipment.receiver?.name || "N/A"}</p>
                        <div className="border-t border-muted pt-2 mt-2">
                          <p className="text-[10px] text-muted-foreground font-bold flex items-center gap-1 uppercase tracking-tighter">
                            <MapPinIcon className="w-3 h-3" /> Current Location
                          </p>
                          <p className="text-xs font-black text-primary mt-1">{shipment.currentLocation || "In Transit"}</p>
                        </div>
                        <Button variant="link" onClick={() => window.open(`/tracking/${shipment.trackingNumber}`, '_blank')} className="h-auto p-0 text-xs font-bold brand-red-text mt-2 uppercase tracking-widest">
                          Full Tracking Details →
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                </div>
              );
            })}
          </MapContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg border border-border flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">System Status</p>
              <p className="text-sm font-bold">All nodes operational</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-border flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Active Alerts</p>
              <p className="text-sm font-bold">No critical delays</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-border flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground">
              <div className="w-3 h-3 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Last Sync</p>
              <p className="text-sm font-bold">Just now</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
