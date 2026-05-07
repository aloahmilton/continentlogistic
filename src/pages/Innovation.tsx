import { Bot, Rocket, Cpu, ScanLine } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

export default function Innovation() {
  usePageSEO({ title: "Innovation", description: "Continent Logistic.org innovation — drones, robotics, AI-powered logistics, and the future of global shipping and delivery." });

  return (
    <PageLayout title="Innovation" breadcrumb={[{ label: "Company", href: "/about" }, { label: "Innovation" }]} heroSubtitle="Pioneering the future of logistics through technology, partnerships, and bold ideas.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6 mb-14">
              {[
                { icon: Rocket, title: "Drone Delivery", desc: "Autonomous drone delivery programs operating in multiple countries for medical supplies, e-commerce parcels, and urgent documents." },
                { icon: Bot, title: "Warehouse Robotics", desc: "AI-driven robots work alongside employees to pick, pack, and sort packages faster and more accurately than ever." },
                { icon: Cpu, title: "AI & Machine Learning", desc: "Predictive analytics for demand forecasting, route optimization, and customs clearance automation." },
                { icon: ScanLine, title: "Smart Tracking", desc: "IoT sensors and real-time analytics provide end-to-end visibility for every shipment in our network." },
              ].map((f) => (
                <div key={f.title} className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <f.icon className="w-7 h-7 brand-red-text mb-3" />
                  <h3 className="font-bold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
