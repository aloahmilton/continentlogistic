import { Users, Globe, Handshake } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

export default function PartnerDirectory() {
  usePageSEO({ title: "Strategic Partner Directory", description: "Continental Track strategic partners — authorized service partners, technology allies, and logistics collaborators worldwide." });

  return (
    <PageLayout title="Strategic Partner Directory" breadcrumb={[{ label: "Strategic Partner Directory" }]} heroSubtitle="Our global network of strategic partners extends Continental Track's reach and capabilities.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6 mb-14">
              {[
                { icon: Handshake, title: "Authorized Service Partners", count: "2,400+", desc: "Local logistics companies certified to Continental Track standards." },
                { icon: Globe, title: "Technology Partners", count: "180+", desc: "Software and platform integrations for seamless logistics workflows." },
                { icon: Users, title: "Industry Alliances", count: "50+", desc: "Trade associations and industry bodies advancing global commerce." },
              ].map((p) => (
                <div key={p.title} className="border border-border rounded-lg p-6 text-center">
                  <p.icon className="w-8 h-8 brand-red-text mx-auto mb-3" />
                  <p className="text-2xl font-bold mb-1">{p.count}</p>
                  <h3 className="font-bold text-sm mb-1">{p.title}</h3>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-muted rounded-lg p-8 text-center">
              <h2 className="text-xl font-bold mb-2">Become a Partner</h2>
              <p className="text-sm text-muted-foreground mb-4">Interested in joining our network? We're always looking for qualified logistics partners.</p>
              <button className="brand-red-bg text-primary-foreground text-sm font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity active:scale-[0.98]">
                Apply to Partner Program
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
