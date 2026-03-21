import { Calendar, MapPin } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

export default function Events() {
  usePageSEO({ title: "Events", description: "Continental Track industry events, conferences, and trade shows. Connect with our logistics experts at events worldwide." });

  const events = [
    { date: "Apr 8–10, 2026", title: "Global Logistics Summit 2026", location: "Singapore", desc: "Join industry leaders discussing the future of supply chain resilience and digital transformation." },
    { date: "May 14–16, 2026", title: "Transport & Logistics Europe", location: "Munich, Germany", desc: "Continental Track showcases autonomous delivery, green logistics, and smart warehousing innovations." },
    { date: "Jun 22–24, 2026", title: "eCommerce Expo Americas", location: "Miami, FL", desc: "Discover our cross-border e-commerce solutions and meet the CT eCommerce team." },
    { date: "Sep 15–17, 2026", title: "Supply Chain World Forum", location: "London, UK", desc: "Panel discussions on AI in logistics, sustainability, and the future of last-mile delivery." },
  ];

  return (
    <PageLayout title="Events" breadcrumb={[{ label: "Company", href: "/about" }, { label: "Events" }]} heroSubtitle="Meet us at industry events around the world.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {events.map((e, i) => (
            <ScrollReveal key={e.title} delay={i * 80}>
              <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-2 text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="w-3.5 h-3.5" /> {e.date}</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="w-3.5 h-3.5" /> {e.location}</span>
                </div>
                <h2 className="font-bold mb-1">{e.title}</h2>
                <p className="text-sm text-muted-foreground">{e.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
