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
              <form className="bg-white border border-border rounded-xl p-8 md:p-10 shadow-xl space-y-8" onSubmit={handleSubmit}>
                <div className="border-b border-border pb-4">
                  <h3 className="font-bold text-2xl tracking-tight">Get Started</h3>
                  <p className="text-sm text-muted-foreground mt-1">Request a tailored business account in minutes.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Company Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Acme Global Logistics"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-3 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/20 transition-all font-medium" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Contact Name</label>
                    <input 
                      type="text" 
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/20 transition-all font-medium" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="you@company.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/20 transition-all font-medium" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/20 transition-all font-medium" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Monthly Shipments</label>
                    <input 
                      type="number" 
                      placeholder="Est. volume"
                      required
                      value={formData.shipments}
                      onChange={(e) => setFormData(prev => ({ ...prev, shipments: e.target.value }))}
                      className="w-full px-4 py-3 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/20 transition-all font-medium" 
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full brand-red-bg text-primary-foreground text-sm font-black uppercase tracking-widest py-4 rounded-md hover:brightness-110 shadow-lg shadow-red-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Submit Business Request"}
                  </button>
                  <p className="text-[10px] text-muted-foreground text-center mt-4">
                    By submitting, you agree to our Terms of Service. Our team will verify and contact you within 24 hours.
                  </p>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
