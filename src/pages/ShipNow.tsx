import { ArrowRight, Package, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

export default function ShipNow() {
  usePageSEO({ title: "Ship Now", description: "Ship your documents and parcels worldwide with Continental Track Express. Fast, reliable, door-to-door delivery." });

  return (
    <PageLayout title="Ship Now" breadcrumb={[{ label: "Ship", href: "/get-a-quote" }, { label: "Ship Now" }]} heroSubtitle="Send your documents and parcels globally with our express shipping service.">
      <div className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Package, title: "Parcel Express", desc: "Door-to-door delivery for documents and parcels up to 70 kg.", time: "1–3 business days" },
                { icon: Clock, title: "Time Definite", desc: "Guaranteed delivery by a specific time — morning, midday, or end of day.", time: "Next business day" },
                { icon: Shield, title: "Insured Shipping", desc: "Full coverage for high-value goods with real-time tracking.", time: "Custom scheduling" },
              ].map((s) => (
                <div key={s.title} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <s.icon className="w-8 h-8 brand-red-text mb-4" />
                  <h3 className="font-bold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                  <p className="text-xs font-medium brand-red-text">{s.time}</p>
                </div>
              ))}
            </div>

            <div className="bg-muted rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Ready to ship?</h2>
              <p className="text-sm text-muted-foreground mb-6">Log in to your MyCT+ account or create one to start shipping today.</p>
              <div className="flex items-center justify-center gap-4">
                <Link to="/customer-portals" className="brand-red-bg text-primary-foreground text-sm font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity active:scale-[0.98] inline-flex items-center gap-2">
                  Log in to MyCT+ <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/business-account" className="border border-border bg-background text-sm font-semibold px-6 py-3 rounded hover:bg-muted transition-colors active:scale-[0.98]">
                  Open a Business Account
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageLayout>
  );
}
