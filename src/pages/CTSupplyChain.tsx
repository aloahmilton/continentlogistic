import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";
import supplyChainImg from "@/assets/supply-chain.jpg";

export default function CTSupplyChain() {
  usePageSEO({ title: "CT Supply Chain", description: "Continental Track Supply Chain — end-to-end warehousing, distribution, and logistics management for global enterprises." });

  return (
    <PageLayout title="CT Supply Chain" breadcrumb={[{ label: "Our Divisions", href: "/divisions" }, { label: "CT Supply Chain" }]} heroSubtitle="End-to-end supply chain management that transforms your logistics into a competitive advantage.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="md:flex gap-10 items-center mb-14">
              <div className="md:w-1/2 mb-6 md:mb-0 rounded-lg overflow-hidden">
                <img src={supplyChainImg} alt="Supply chain operations" className="w-full h-64 object-cover" />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-3">Your 3PL partner</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  From contract logistics to lead logistics provider services, CT Supply Chain designs and operates complex supply chains for the world's leading brands.
                </p>
                <div className="space-y-2">
                  {["Warehousing & Distribution", "Transport Management", "Packaging & Value-Added Services", "Service Logistics & Returns", "Lead Logistics Provider"].map((s) => (
                    <div key={s} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 brand-red-text" /> {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center bg-muted rounded-lg p-8">
              <h2 className="text-xl font-bold mb-2">Let's optimize your supply chain</h2>
              <p className="text-sm text-muted-foreground mb-4">Speak with our experts about tailored logistics solutions.</p>
              <Link to="/get-a-quote" className="brand-red-bg text-primary-foreground text-sm font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity active:scale-[0.98] inline-flex items-center gap-2">
                Request a Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
