import { useState } from "react";
import { Package, Plane, Ship, Truck } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";
import { leadApi } from "@/lib/api";
import { toast } from "sonner";

export default function GetAQuote() {
  usePageSEO({ title: "Get a Quote", description: "Request a shipping quote from Continental Track. Get competitive rates for express, air, ocean, and road freight services worldwide." });
  const [shipType, setShipType] = useState("express");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    fromLocation: "",
    toLocation: "",
    weight: "",
    dimensions: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await leadApi.create({
        ...formData,
        serviceType: shipType
      });
      toast.success("Quote request submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        fromLocation: "",
        toLocation: "",
        weight: "",
        dimensions: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast.error("Failed to submit quote request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Get a Quote" breadcrumb={[{ label: "Get a Quote" }]} heroSubtitle="Get an instant estimate for your next shipment — whether it's a document, parcel, or full container.">
      <div className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            {/* Service selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
              {[
                { id: "express", icon: Package, label: "Express" },
                { id: "air", icon: Plane, label: "Air Freight" },
                { id: "ocean", icon: Ship, label: "Ocean Freight" },
                { id: "road", icon: Truck, label: "Road Freight" },
              ].map((s) => (
                <button key={s.id} onClick={() => setShipType(s.id)} className={`flex flex-col items-center gap-2 p-5 rounded-lg border-2 transition-all active:scale-[0.97] ${shipType === s.id ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"}`}>
                  <s.icon className={`w-6 h-6 ${shipType === s.id ? "brand-red-text" : "text-muted-foreground"}`} />
                  <span className="text-sm font-medium">{s.label}</span>
                </button>
              ))}
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="Your Name" className="w-full px-4 py-3 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="email@example.com" className="w-full px-4 py-3 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" placeholder="+1..." className="w-full px-4 py-3 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">From (City/Country)</label>
                  <input required value={formData.fromLocation} onChange={e => setFormData({...formData, fromLocation: e.target.value})} type="text" placeholder="e.g. New York, USA" className="w-full px-4 py-3 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">To (City/Country)</label>
                  <input required value={formData.toLocation} onChange={e => setFormData({...formData, toLocation: e.target.value})} type="text" placeholder="e.g. London, UK" className="w-full px-4 py-3 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Weight (kg) & Dimensions</label>
                  <input value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} type="text" placeholder="e.g. 10kg, 20x20x10cm" className="w-full px-4 py-3 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Any Special Instructions?</label>
                  <input value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} type="text" placeholder="Fragile, urgent, etc." className="w-full px-4 py-3 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <button disabled={loading} type="submit" className="brand-red-bg text-primary-foreground text-sm font-semibold px-8 py-3 rounded hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50">
                {loading ? "Submitting..." : "Get Quote"}
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </PageLayout>
  );
}
