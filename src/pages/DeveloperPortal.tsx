import { Code, BookOpen, Key, Webhook } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

export default function DeveloperPortal() {
  usePageSEO({ title: "Developer Portal", description: "Continent Logistic.org APIs and developer resources. Integrate tracking, shipping, and logistics into your applications." });

  return (
    <PageLayout title="Developer Portal" breadcrumb={[{ label: "Developer Portal" }]} heroSubtitle="Integrate Continent Logistic.org shipping, tracking, and logistics into your applications with our REST APIs.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6 mb-14">
              {[
                { icon: Code, title: "Tracking API", desc: "Real-time shipment tracking with milestone events, estimated delivery, and proof of delivery." },
                { icon: Key, title: "Shipping API", desc: "Create shipments, generate labels, schedule pickups, and manage returns programmatically." },
                { icon: Webhook, title: "Webhooks", desc: "Subscribe to shipment events and receive real-time push notifications to your systems." },
                { icon: BookOpen, title: "Documentation", desc: "Comprehensive guides, code samples in 6 languages, and interactive API explorer." },
              ].map((f) => (
                <div key={f.title} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <f.icon className="w-7 h-7 brand-red-text mb-3" />
                  <h3 className="font-bold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-foreground text-primary-foreground rounded-lg p-6 font-mono text-sm overflow-x-auto">
              <p className="text-muted-foreground/60 mb-2">// Example: Track a shipment</p>
              <p><span className="brand-yellow-text">GET</span> /api/v1/tracking/CT1234567890</p>
              <p className="mt-3 text-muted-foreground/60">// Response</p>
              <p>{"{"}</p>
              <p className="ml-4">"trackingNumber": "CT1234567890",</p>
              <p className="ml-4">"status": "In Transit",</p>
              <p className="ml-4">"estimatedDelivery": "2026-03-23T14:00:00Z"</p>
              <p>{"}"}</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
