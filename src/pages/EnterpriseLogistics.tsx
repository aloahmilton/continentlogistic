import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";
import supplyChainImg from "@/assets/supply-chain.jpg";
import warehouseImg from "@/assets/warehouse.jpg";

export default function EnterpriseLogistics() {
  usePageSEO({ title: "Enterprise Logistics Services", description: "End-to-end supply chain management, warehousing, and transport solutions from Continent Logistic.org. Transform your logistics operations." });

  const services = [
    { title: "Warehousing & Distribution", desc: "State-of-the-art facilities with automated inventory management and order fulfillment across 60+ countries.", img: warehouseImg },
    { title: "Supply Chain Management", desc: "Integrated, end-to-end solutions that optimize your supply chain from raw material to final delivery.", img: supplyChainImg },
  ];

  return (
    <PageLayout title="Enterprise Logistics Services" breadcrumb={[{ label: "Enterprise Logistics Services" }]} heroSubtitle="Transform your business with end-to-end logistics solutions powered by Continent Logistic.org Supply Chain.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {services.map((s, i) => (
            <ScrollReveal key={s.title}>
              <div className={`md:flex gap-10 items-center ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                <div className="md:w-1/2 mb-6 md:mb-0 rounded-lg overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-64 object-cover" />
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold mb-2">{s.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
                  <Link to="/get-a-quote" className="inline-flex items-center gap-1 brand-red-text text-sm font-medium hover:underline">
                    Request a consultation <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <div className="bg-muted rounded-lg p-8">
              <h2 className="text-xl font-bold mb-4">Capabilities</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {["Warehousing", "Packaging", "Real Estate Solutions", "Transport Management", "Service Logistics", "Archimod Solutions", "Lead Logistics", "Customs Brokerage", "Returns Management"].map((c) => (
                  <div key={c} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 brand-red-text flex-shrink-0" /> {c}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
