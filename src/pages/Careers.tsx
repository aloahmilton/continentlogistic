import { Briefcase, Globe, Heart, TrendingUp } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

export default function Careers() {
  usePageSEO({ title: "Careers", description: "Join the Continental Track team. Explore career opportunities in logistics, technology, operations, and more across 220+ countries." });

  return (
    <PageLayout title="Careers" breadcrumb={[{ label: "Company", href: "/about" }, { label: "Careers" }]} heroSubtitle="Join 380,000+ colleagues making global trade possible. Explore opportunities across the world.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6 mb-14">
              {[
                { icon: Globe, title: "Global Opportunities", desc: "Work in any of our 220+ country operations. Transfer between divisions and grow internationally." },
                { icon: TrendingUp, title: "Career Growth", desc: "Structured development programs, mentorship, and clear promotion paths at every level." },
                { icon: Heart, title: "Great Benefits", desc: "Competitive compensation, health coverage, retirement plans, and employee wellness programs." },
                { icon: Briefcase, title: "Diverse Roles", desc: "From logistics operations to technology, finance, marketing, and executive leadership." },
              ].map((f) => (
                <div key={f.title} className="border border-border rounded-lg p-6">
                  <f.icon className="w-7 h-7 brand-red-text mb-3" />
                  <h3 className="font-bold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-muted rounded-lg p-8">
              <h2 className="text-xl font-bold mb-4">Open Positions</h2>
              {[
                { title: "Supply Chain Analyst", location: "New York, NY", type: "Full-time" },
                { title: "Operations Manager", location: "London, UK", type: "Full-time" },
                { title: "Software Engineer", location: "Berlin, Germany", type: "Full-time" },
                { title: "Customer Service Representative", location: "Singapore", type: "Full-time" },
                { title: "Warehouse Supervisor", location: "Los Angeles, CA", type: "Full-time" },
              ].map((j) => (
                <div key={j.title} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-sm">{j.title}</p>
                    <p className="text-xs text-muted-foreground">{j.location} · {j.type}</p>
                  </div>
                  <span className="brand-red-text text-sm font-medium hover:underline cursor-pointer">Apply →</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
