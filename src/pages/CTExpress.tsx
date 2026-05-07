import { Clock, Globe, Shield, Package, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";
import couriersImg from "@/assets/couriers.jpg";

export default function CTExpress() {
  usePageSEO({ title: "CT Express", description: "Continent Logistic.org Express — the world's leading international express shipping service. Fast, reliable document and parcel delivery to 220+ countries." });

  return (
    <PageLayout title="CT Express" breadcrumb={[{ label: "Our Divisions", href: "/divisions" }, { label: "CT Express" }]} heroSubtitle="The world's leading international express shipping service — delivering to 220+ countries and territories.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="md:flex gap-10 items-center mb-16">
              <div className="md:w-1/2 mb-6 md:mb-0 rounded-lg overflow-hidden">
                <img src={couriersImg} alt="CT Express couriers" className="w-full h-72 object-cover" />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-3">Ship with confidence</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  CT Express offers time-definite international shipping for documents and parcels. With our extensive global network, your shipment arrives on time, every time.
                </p>
                <Link to="/ship-now" className="brand-red-bg text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded hover:opacity-90 transition-opacity active:scale-[0.98] inline-flex items-center gap-2">
                  Ship Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Clock, title: "Time Definite", desc: "Guaranteed delivery windows — morning, midday, or end of business day." },
                { icon: Globe, title: "220+ Countries", desc: "The world's most international express network serving every corner of the globe." },
                { icon: Shield, title: "Full Visibility", desc: "Track every milestone from pickup to delivery in real time." },
                { icon: Package, title: "Any Size", desc: "From a single document to palletized freight up to 1,000 kg." },
              ].map((f) => (
                <div key={f.title} className="text-center p-5">
                  <f.icon className="w-8 h-8 brand-red-text mx-auto mb-3" />
                  <h3 className="font-bold text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
