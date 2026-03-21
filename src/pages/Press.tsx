import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

export default function Press() {
  usePageSEO({ title: "Press Center", description: "Latest news, press releases, and media resources from Continental Track. Stay informed about our global logistics operations." });

  const releases = [
    { date: "March 15, 2026", title: "Continental Track Reports Record Q4 Revenue Driven by Cross-Border E-Commerce Growth", category: "Financial" },
    { date: "March 8, 2026", title: "CT Express Launches Same-Day Delivery Service in 12 New Markets", category: "Service" },
    { date: "February 28, 2026", title: "Continental Track Achieves Carbon Neutral Operations Milestone in Europe", category: "Sustainability" },
    { date: "February 15, 2026", title: "New AI-Powered Route Optimization Reduces Last-Mile Delivery Times by 23%", category: "Innovation" },
    { date: "February 1, 2026", title: "Continental Track Partners with Leading Autonomous Vehicle Manufacturer for Pilot Program", category: "Innovation" },
  ];

  return (
    <PageLayout title="Press Center" breadcrumb={[{ label: "Company", href: "/about" }, { label: "Press Center" }]} heroSubtitle="The latest news, announcements, and media resources from Continental Track.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="space-y-0 divide-y divide-border">
              {releases.map((r) => (
                <article key={r.title} className="py-6 group cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                    <span className="text-xs font-medium brand-red-text bg-primary/5 px-2 py-0.5 rounded">{r.category}</span>
                  </div>
                  <h2 className="font-bold group-hover:brand-red-text transition-colors">{r.title}</h2>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
