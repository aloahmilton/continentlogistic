import { TrendingUp, FileText, Calendar } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

export default function Investors() {
  usePageSEO({ title: "Investor Relations", description: "Continental Track investor relations — financial reports, stock information, and corporate governance for shareholders and analysts." });

  return (
    <PageLayout title="Investor Relations" breadcrumb={[{ label: "Company", href: "/about" }, { label: "Investors" }]} heroSubtitle="Financial performance, governance, and shareholder resources.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6 mb-14">
              {[
                { icon: TrendingUp, title: "Financial Highlights", items: ["Revenue: $84.2B (FY 2025)", "EBIT: $8.4B", "Free Cash Flow: $3.1B", "Employees: 380,000+"] },
                { icon: FileText, title: "Reports & Filings", items: ["Annual Report 2025", "Q4 2025 Results", "Sustainability Report", "Corporate Governance"] },
                { icon: Calendar, title: "Upcoming Events", items: ["Q1 2026 Earnings: Apr 18", "Annual Shareholder Meeting: May 12", "Capital Markets Day: Sep 22"] },
              ].map((s) => (
                <div key={s.title} className="border border-border rounded-lg p-6">
                  <s.icon className="w-7 h-7 brand-red-text mb-3" />
                  <h3 className="font-bold mb-3">{s.title}</h3>
                  <ul className="space-y-1.5">
                    {s.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
