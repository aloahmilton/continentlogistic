import { Plane, Ship, Truck, Package, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";
import oceanFreightImg from "@/assets/ocean-freight.jpg";
import airFreightImg from "@/assets/air-freight.jpg";

export default function CTGlobalForwarding() {
  usePageSEO({ title: "CT Global Forwarding", description: "Continent Logistic.org Global Forwarding — air, ocean, road, and rail freight solutions for businesses shipping cargo worldwide." });

  return (
    <PageLayout title="CT Global Forwarding" breadcrumb={[{ label: "Our Divisions", href: "/divisions" }, { label: "CT Global Forwarding" }]} heroSubtitle="Multimodal freight solutions — air, ocean, road, and rail — for businesses of every size.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6 mb-14">
              {[
                { icon: Plane, title: "Air Freight", desc: "Time-critical and charter solutions connecting every major trade lane.", img: airFreightImg },
                { icon: Ship, title: "Ocean Freight", desc: "FCL, LCL, and breakbulk services with global port-to-port coverage.", img: oceanFreightImg },
              ].map((s) => (
                <div key={s.title} className="rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
                  <img src={s.img} alt={s.title} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <s.icon className="w-5 h-5 brand-red-text" />
                      <h3 className="font-bold">{s.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6 mb-14">
              {[
                { icon: Truck, title: "Road Freight", desc: "Full and partial truckload services across continents with flexible scheduling." },
                { icon: Package, title: "Rail Freight", desc: "Cost-effective, sustainable rail solutions connecting key trade corridors." },
              ].map((s) => (
                <div key={s.title} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <s.icon className="w-6 h-6 brand-red-text mb-3" />
                  <h3 className="font-bold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center bg-muted rounded-lg p-8">
              <h2 className="text-xl font-bold mb-2">Need a freight quote?</h2>
              <p className="text-sm text-muted-foreground mb-4">Get competitive rates for your next cargo shipment.</p>
              <Link to="/get-a-quote" className="brand-red-bg text-primary-foreground text-sm font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity active:scale-[0.98] inline-flex items-center gap-2">
                Get a Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
