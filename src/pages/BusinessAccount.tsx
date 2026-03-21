import { Check } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

export default function BusinessAccount() {
  usePageSEO({ title: "Request a Business Account", description: "Open a Continental Track business account for exclusive rates, dedicated support, and streamlined logistics solutions." });

  return (
    <PageLayout title="Request a Business Account" breadcrumb={[{ label: "Request a Business Account" }]} heroSubtitle="Unlock exclusive benefits, priority support, and competitive rates for your business.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto md:flex gap-12">
          <ScrollReveal>
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-xl font-bold mb-4">Why open a business account?</h2>
              <ul className="space-y-3">
                {[
                  "Competitive volume-based pricing",
                  "Dedicated account manager",
                  "Priority customer support",
                  "Access to MyCT+ shipping platform",
                  "Flexible billing and payment terms",
                  "Custom supply chain solutions",
                  "Automated shipping workflows",
                  "Advanced reporting and analytics",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 brand-red-text flex-shrink-0 mt-0.5" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="md:w-1/2">
              <form className="bg-muted rounded-lg p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <h3 className="font-bold text-lg">Get started</h3>
                {[
                  { label: "Company Name", type: "text", placeholder: "Your company" },
                  { label: "Contact Name", type: "text", placeholder: "Full name" },
                  { label: "Business Email", type: "email", placeholder: "you@company.com" },
                  { label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" },
                  { label: "Estimated Monthly Shipments", type: "number", placeholder: "e.g. 50" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-sm font-medium mb-1">{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} className="w-full px-4 py-2.5 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring bg-background" />
                  </div>
                ))}
                <button type="submit" className="w-full brand-red-bg text-primary-foreground text-sm font-semibold py-3 rounded hover:opacity-90 transition-opacity active:scale-[0.98]">
                  Submit Request
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
