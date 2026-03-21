import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Package, Truck, MapPin, Calendar, Clock, ChevronRight, AlertCircle } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { shipmentApi } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function Tracking() {
  const { id } = useParams();
  const [shipment, setShipment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      fetchShipment(id);
    }
  }, [id]);

  const fetchShipment = async (trackingId: string) => {
    try {
      setLoading(true);
      const response = await shipmentApi.get(trackingId);
      setShipment(response.data);
      setError(false);
    } catch (err) {
      console.error("Error fetching shipment:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-12 flex-1">
          <Skeleton className="h-10 w-64 mb-6" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-96 w-full rounded-lg" />
              <Skeleton className="h-40 w-full rounded-lg" />
            </div>
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-24 flex-1 text-center">
          <AlertCircle className="w-16 h-16 brand-red-text mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Shipment Not Found</h1>
          <p className="text-muted-foreground mb-8">We couldn't find a shipment with tracking number "{id}". Please check and try again.</p>
          <Link to="/" className="brand-red-bg text-white px-6 py-3 rounded font-semibold inline-block">Go Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const historyPoints = shipment.updates
    ?.filter((u: any) => u.coordinates?.lat)
    .map((u: any) => [u.coordinates.lat, u.coordinates.lng] as [number, number]) || [];
  
  if (shipment.coordinates?.lat) {
    historyPoints.unshift([shipment.coordinates.lat, shipment.coordinates.lng]);
  }

  const currentPos = historyPoints.length > 0 ? historyPoints[historyPoints.length - 1] : [0, 0] as [number, number];

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="no-print">
          <Header />
        </div>
        
        <div className="container mx-auto px-4 py-8 flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1 uppercase tracking-wider font-bold">
                <Package className="w-3 h-3" /> Shipment Tracking
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-3xl font-bold">{shipment.trackingNumber}</h1>
                <button 
                  onClick={() => window.print()} 
                  className="no-print flex items-center gap-2 text-xs font-bold border border-border px-3 py-1.5 rounded hover:bg-muted transition-colors"
                >
                  <Clock className="w-3.5 h-3.5" /> Download Receipt
                </button>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-muted/50 rounded-lg border border-border w-full md:w-auto">
              <div className="flex-1 border-r border-border pr-4">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Current Status</p>
                <p className="font-bold brand-red-text capitalize">{shipment.status.replace(/_/g, " ")}</p>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Estimated Delivery</p>
                <p className="font-bold">
                  {shipment.estimatedDelivery ? new Date(shipment.estimatedDelivery).toLocaleDateString() : "Pending"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Map */}
              <div className="h-96 w-full rounded-lg overflow-hidden border border-border shadow-sm z-0">
                <MapContainer center={currentPos} zoom={historyPoints.length > 1 ? 4 : 2} style={{ height: "100%", width: "100%" }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {historyPoints.length > 1 && (
                    <Polyline positions={historyPoints} color="#E31E24" weight={3} opacity={0.7} dashArray="5, 10" />
                  )}
                  {historyPoints.map((pos, idx) => (
                    <Marker key={idx} position={pos} icon={idx === historyPoints.length - 1 ? undefined : L.divIcon({ className: 'bg-primary w-2 h-2 rounded-full border-2 border-white' })}>
                      <Popup>
                        <div className="text-sm font-bold">
                          {idx === 0 ? "Origin" : idx === historyPoints.length - 1 ? `Current: ${shipment.currentLocation}` : shipment.updates[idx-1]?.location}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {idx === 0 ? "" : new Date(shipment.updates[idx-1]?.timestamp).toLocaleString()}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>

              {/* Timeline */}
              <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 brand-red-text" /> Shipment History
                </h2>
                <div className="space-y-0">
                  {shipment.updates && shipment.updates.length > 0 ? (
                    shipment.updates.map((update: any, idx: number) => (
                      <div key={idx} className="flex gap-4 group">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full mt-1.5 z-10 ${idx === 0 ? "bg-primary ring-4 ring-primary/20" : "bg-muted-foreground/30"}`} />
                          {idx !== shipment.updates.length - 1 && (
                            <div className="w-0.5 h-full bg-border my-1" />
                          )}
                        </div>
                        <div className="pb-8 flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-1">
                            <h3 className={`font-bold capitalize ${idx === 0 ? "text-foreground" : "text-muted-foreground"}`}>
                              {update.status.replace(/_/g, " ")}
                            </h3>
                            <span className="text-xs text-muted-foreground font-medium">
                              {new Date(update.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-foreground mb-1">{update.location}</p>
                          <p className="text-sm text-muted-foreground">{update.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-muted-foreground border-2 border-dashed rounded-lg">
                      No history updates available yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-bold mb-4 border-b pb-2">Shipment Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Service Type</p>
                    <p className="text-sm font-medium">{shipment.serviceType || "Express Parcel"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Weight</p>
                      <p className="text-sm font-medium">{shipment.weight ? `${shipment.weight} kg` : "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Dimensions</p>
                      <p className="text-sm font-medium">{shipment.dimensions || "N/A"}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t mt-2">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="mt-1 flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full border border-primary" />
                        <div className="w-0.5 h-8 bg-border border-dashed my-1" />
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="mb-4">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">Origin</p>
                          <p className="text-sm font-medium">{shipment.origin}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase font-bold">Destination</p>
                          <p className="text-sm font-medium">{shipment.destination}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="brand-yellow-bg rounded-lg p-6">
                <h3 className="font-bold mb-2">Need Help?</h3>
                <p className="text-xs text-foreground/70 mb-4">If you have questions about your shipment, our customer service team is ready to assist you.</p>
                <Link to="/customer-service" className="inline-flex items-center gap-1 text-xs font-bold brand-red-text hover:underline">
                  Contact Customer Service <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="no-print">
          <Footer />
        </div>
      </div>

      {/* Printable Receipt */}
      <div className="print-only p-8 text-black bg-white min-h-screen">
        <div className="flex justify-between items-start border-b-2 border-black pb-8 mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-1">CONTINENTAL TRACK</h1>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-600">Global Logistics Advisory & Tracking</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">SHIPMENT RECEIPT</h2>
            <p className="text-sm text-gray-500">Issued on {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-xs font-black uppercase mb-3 border-b border-gray-200 pb-1">Sender Information</h3>
            <p className="font-bold">{shipment.sender?.name || "N/A"}</p>
            <p className="text-sm text-gray-600">{shipment.sender?.email || ""}</p>
            <p className="text-sm text-gray-600">{shipment.sender?.phone || ""}</p>
            <p className="text-sm mt-2"><span className="font-bold">Origin:</span> {shipment.origin}</p>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase mb-3 border-b border-gray-200 pb-1">Receiver Information</h3>
            <p className="font-bold">{shipment.receiver?.name || "N/A"}</p>
            <p className="text-sm text-gray-600">{shipment.receiver?.email || ""}</p>
            <p className="text-sm text-gray-600">{shipment.receiver?.phone || ""}</p>
            <p className="text-sm mt-2"><span className="font-bold">Destination:</span> {shipment.destination}</p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded p-6 mb-8">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-[10px] font-black uppercase text-gray-500">Tracking Number</p>
              <p className="font-bold">{shipment.trackingNumber}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-gray-500">Service Type</p>
              <p className="font-bold">{shipment.serviceType || "Express"}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-gray-500">Status</p>
              <p className="font-bold capitalize">{shipment.status.replace(/_/g, " ")}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-gray-500">Estimated Delivery</p>
              <p className="font-bold">{shipment.estimatedDelivery ? new Date(shipment.estimatedDelivery).toLocaleDateString() : "Pending"}</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-xs font-black uppercase mb-4 border-b border-gray-200 pb-1">Shipment History</h3>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black uppercase">Date</th>
                <th className="text-left py-2 font-black uppercase">Status</th>
                <th className="text-left py-2 font-black uppercase">Location</th>
              </tr>
            </thead>
            <tbody>
              {shipment.updates?.map((update: any, i: number) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 text-gray-600">{new Date(update.timestamp).toLocaleString()}</td>
                  <td className="py-2 font-bold capitalize">{update.status.replace(/_/g, " ")}</td>
                  <td className="py-2">{update.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-auto pt-12 border-t border-gray-200 flex justify-between items-end grayscale">
          <div className="max-w-xs">
            <p className="text-[10px] leading-relaxed text-gray-500 italic">
              This document serves as an official electronic receipt for the shipment identified above. Continental Track Logistics operates under international carriage laws and regulations.
            </p>
          </div>
          <div className="text-right">
            <div className="w-24 h-24 border-2 border-black inline-block flex items-center justify-center p-2 mb-2">
              <p className="text-[8px] font-bold text-center">SECURITY SEAL<br />{shipment.trackingNumber}</p>
            </div>
            <p className="text-[10px] font-bold">OFFICIAL LOGISTICS RECORD</p>
          </div>
        </div>
      </div>
    </>
  );
}
