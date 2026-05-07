import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";
import couriersImg from "@/assets/couriers.jpg";
import oceanFreightImg from "@/assets/ocean-freight.jpg";
import supplyChainImg from "@/assets/supply-chain.jpg";
import warehouseImg from "@/assets/warehouse.jpg";

const divisions = [
  { name: "CT Express", desc: "The world's leading international express shipping service. Documents and parcels delivered to 220+ countries.", href: "/ct-express", img: couriersImg },
  { name: "CT Global Forwarding", desc: "Multimodal freight — air, ocean, road, and rail — for businesses shipping cargo worldwide.", href: "/ct-global-forwarding", img: oceanFreightImg },
  { name: "CT Supply Chain", desc: "End-to-end warehousing, distribution, and logistics management for enterprises.", href: "/ct-supply-chain", img: supplyChainImg },
  { name: "CT eCommerce", desc: "Last-mile delivery and cross-border solutions for online retailers.", href: "/ct-ecommerce", img: warehouseImg },
];

export default function Divisions() {
  usePageSEO({ title: "Our Divisions", description: "Explore Continent Logistic.org's global divisions — Express, Global Forwarding, Supply Chain, and eCommerce — serving every logistics need." });

  return (
    <PageLayout title="Our Divisions" breadcrumb={[{ label: "Our Divisions" }]} heroSubtitle="Continent Logistic.org operates through four specialized divisions, each focused on delivering excellence in their domain.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-10">
          {divisions.map((d, i) => (
            <ScrollReveal key={d.name} delay={i * 80}>
              <Link to={d.href} className="group md:flex gap-8 items-center block">
                <div className="md:w-64 flex-shrink-0 mb-4 md:mb-0 rounded-lg overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1 group-hover:brand-red-text transition-colors flex items-center gap-2">
                    {d.name} <ArrowRight className="w-4 h-4" />
                  </h2>
                  <p className="text-sm text-muted-foreground">{d.desc}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
