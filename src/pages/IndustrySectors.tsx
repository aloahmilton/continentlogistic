import { Car, Zap, Wrench, Heart, ShoppingBag, Cpu, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

const sectors = [
  { icon: Car, title: "Auto-Mobility", desc: "Just-in-time delivery, inbound-to-manufacturing, and finished vehicle logistics for the automotive industry." },
  { icon: Zap, title: "Energy", desc: "Project logistics, heavy-lift transport, and supply chain solutions for oil, gas, and renewable energy sectors." },
  { icon: Wrench, title: "Engineering & Manufacturing", desc: "Complex supply chains for industrial equipment, machinery, and high-tech manufacturing operations." },
  { icon: Heart, title: "Life Sciences & Healthcare", desc: "Temperature-controlled, GDP-compliant logistics for pharmaceuticals, medical devices, and clinical trials." },
  { icon: ShoppingBag, title: "Retail & Fashion", desc: "Omnichannel fulfillment, seasonal surge management, and returns logistics for global retail brands." },
  { icon: Cpu, title: "Technology", desc: "High-value, time-sensitive logistics for electronics, semiconductors, and data center equipment." },
];

export default function IndustrySectors() {
  usePageSEO({ title: "Industry Sectors", description: "Continent Logistic.org industry-specific logistics solutions for automotive, energy, healthcare, retail, technology, and manufacturing sectors." });

  return (
    <PageLayout title="Industry Sectors" breadcrumb={[{ label: "Industry Sectors" }]} heroSubtitle="Tailored logistics solutions for the industries that drive the global economy.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {sectors.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 60}>
              <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow h-full">
                <s.icon className="w-8 h-8 brand-red-text mb-3" />
                <h2 className="font-bold mb-2">{s.title}</h2>
                <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                <span className="brand-red-text text-sm font-medium inline-flex items-center gap-1 hover:underline cursor-pointer">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
