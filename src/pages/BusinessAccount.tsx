import { useState, FormEvent } from "react";
import { Check } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";
import { leadApi } from "@/lib/api";
import { toast } from "sonner";

export default function BusinessAccount() {
  usePageSEO({ title: "Request a Business Account", description: "Open a Continental Track business account for exclusive rates, dedicated support, and streamlined logistics solutions." });

  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    shipments: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await leadApi.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        serviceType: "Business Account Request",
        message: `Estimated Monthly Shipments: ${formData.shipments}`
      });
      toast.success("Account request submitted successfully. Our team will contact you shortly.");
      setFormData({ company: "", name: "", email: "", phone: "", shipments: "" });
    } catch (error) {
      toast.error("Failed to submit request. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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
              <form className="bg-muted rounded-lg p-6 space-y-4" onSubmit={handleSubmit}>
                <h3 className="font-bold text-lg">Get started</h3>
                {[
                  { id: "company", label: "Company Name", type: "text", placeholder: "Your company" },
                  { id: "name", label: "Contact Name", type: "text", placeholder: "Full name" },
                  { id: "email", label: "Business Email", type: "email", placeholder: "you@company.com" },
                  { id: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" },
                  { id: "shipments", label: "Estimated Monthly Shipments", type: "number", placeholder: "e.g. 50" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-sm font-medium mb-1">{f.label}</label>
                    <input 
                      type={f.type} 
                      placeholder={f.placeholder}
                      required
                      value={formData[f.id as keyof typeof formData]}
                      onChange={(e) => setFormData(prev => ({ ...prev, [f.id]: e.target.value }))}
                      className="w-full px-4 py-2.5 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring bg-background" 
                    />
                  </div>
                ))}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full brand-red-bg text-primary-foreground text-sm font-semibold py-3 rounded hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
