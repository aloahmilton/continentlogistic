import { AlertTriangle, Mail, Phone, Shield } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

export default function FraudAwareness() {
  usePageSEO({ title: "Fraud Awareness", description: "Protect yourself from scams impersonating Continent Logistic.org. Learn how to identify fraudulent emails, calls, and websites." });

  return (
    <PageLayout title="Fraud Awareness" breadcrumb={[{ label: "Fraud Awareness" }]} heroSubtitle="Protect yourself from scams that misuse the Continent Logistic.org brand.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6 mb-8 flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold mb-1">Important Notice</h2>
                <p className="text-sm text-muted-foreground">Continent Logistic.org will never ask for payment via email, text message, or phone to release a shipment. If you receive such a request, it is fraudulent.</p>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Common Fraud Types</h2>
            <div className="space-y-4 mb-10">
              {[
                { icon: Mail, title: "Phishing Emails", desc: "Fake emails claiming a shipment requires payment or personal information. Look for misspelled domains and urgent language." },
                { icon: Phone, title: "Phone Scams", desc: "Callers impersonating Continent Logistic.org demanding fees to release packages. We never call to request advance payment." },
                { icon: Shield, title: "Fake Websites", desc: "Websites mimicking our branding to collect credit card or personal data. Always verify the URL is Continentlogistic.com." },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-4 border border-border rounded-lg p-5">
                  <f.icon className="w-6 h-6 brand-red-text flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h2 className="font-bold mb-2">Report Suspected Fraud</h2>
              <p className="text-sm text-muted-foreground">If you believe you've received a fraudulent communication, please forward it to <span className="font-medium text-foreground">Continentlogistic01@gmail.com</span> and delete the message.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
