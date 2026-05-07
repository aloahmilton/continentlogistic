import { Leaf, Zap, Recycle, Target } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

export default function Sustainability() {
  usePageSEO({ title: "Sustainability", description: "Continent Logistic.org's commitment to sustainable logistics — reducing emissions, green operations, and science-based environmental targets." });

  return (
    <PageLayout title="Sustainability" breadcrumb={[{ label: "Company", href: "/about" }, { label: "Sustainability" }]} heroSubtitle="Our commitment to sustainable logistics and a zero-emissions future by 2050.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6 mb-14">
              {[
                { icon: Target, title: "Mission 2050", desc: "Net-zero logistics emissions by 2050 through fleet electrification, sustainable aviation fuel, and operational efficiency." },
                { icon: Leaf, title: "Green Delivery", desc: "Over 30,000 electric vehicles deployed globally. Carbon-neutral last-mile delivery in 80+ cities." },
                { icon: Zap, title: "Clean Energy", desc: "50% of warehouse operations powered by renewable energy. Solar installations across 400+ facilities." },
                { icon: Recycle, title: "Circular Logistics", desc: "Sustainable packaging programs and reverse logistics solutions that minimize waste across supply chains." },
              ].map((s) => (
                <div key={s.title} className="border border-border rounded-lg p-6">
                  <s.icon className="w-7 h-7 brand-red-text mb-3" />
                  <h3 className="font-bold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-muted rounded-lg p-8 text-center">
              <h2 className="text-xl font-bold mb-2">Sustainability Milestones</h2>
              <div className="grid grid-cols-3 gap-6 mt-6">
                {[
                  { stat: "30%", label: "Emissions reduced since 2017" },
                  { stat: "30K+", label: "Electric vehicles in fleet" },
                  { stat: "80+", label: "Cities with carbon-neutral delivery" },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="text-2xl font-bold brand-red-text">{m.stat}</p>
                    <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
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
