import { ShoppingCart, Globe, RotateCcw, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

export default function CTEcommerce() {
  usePageSEO({ title: "CT eCommerce", description: "Continent Logistic.org eCommerce — last-mile delivery and cross-border e-commerce solutions connecting online retailers to customers worldwide." });

  return (
    <PageLayout title="CT eCommerce" breadcrumb={[{ label: "Our Divisions", href: "/divisions" }, { label: "CT eCommerce" }]} heroSubtitle="Connecting e-commerce businesses to consumers with reliable last-mile delivery across 220+ countries.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6 mb-14">
              {[
                { icon: ShoppingCart, title: "E-Commerce Fulfillment", desc: "Seamless integration with all major e-commerce platforms and marketplaces." },
                { icon: Globe, title: "Cross-Border Solutions", desc: "Simplified customs clearance and international delivery for online retailers." },
                { icon: RotateCcw, title: "Returns Management", desc: "Easy, consumer-friendly returns process that builds brand loyalty." },
                { icon: BarChart3, title: "Analytics & Insights", desc: "Real-time shipment data and performance dashboards for smarter decisions." },
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
            <div className="text-center bg-muted rounded-lg p-8">
              <h2 className="text-xl font-bold mb-2">Scale your online business</h2>
              <p className="text-sm text-muted-foreground mb-4">Partner with CT eCommerce for reliable cross-border delivery.</p>
              <Link to="/business-account" className="brand-red-bg text-primary-foreground text-sm font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity active:scale-[0.98] inline-flex items-center gap-2">
                Open a Business Account <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
