import { Package, AlertTriangle, FileText, Scale } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

export default function ShippingGuidance() {
  usePageSEO({ title: "Shipping Guidance", description: "Continental Track shipping guidance — packing tips, prohibited items, customs documentation, and weight/size restrictions for international shipments." });

  return (
    <PageLayout title="Shipping Guidance" breadcrumb={[{ label: "Shipping Guidance" }]} heroSubtitle="Everything you need to know to prepare your shipment for fast, safe delivery.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 mb-14">
              {[
                { icon: Package, title: "Packing Your Shipment", items: ["Use a sturdy, corrugated box appropriate for the contents", "Wrap items individually with bubble wrap or packing paper", "Fill empty space with cushioning material", "Seal all seams with strong packing tape", "Remove or cover old labels and barcodes"] },
                { icon: AlertTriangle, title: "Prohibited Items", items: ["Flammable liquids and gases", "Explosives and ammunition", "Illegal narcotics", "Live animals (without proper authorization)", "Counterfeit goods and currency"] },
                { icon: FileText, title: "Customs Documentation", items: ["Commercial invoice for all international shipments", "Certificate of origin when required", "Packing list with detailed item descriptions", "Import/export licenses for restricted goods", "Accurate HS/tariff codes for each item"] },
                { icon: Scale, title: "Weight & Size Limits", items: ["CT Express: Max 70 kg per piece, 300 cm length", "Pallets: Max 1,000 kg, standard EUR/US sizes", "Air freight: Volumetric weight applies", "Ocean freight: 20ft and 40ft container options", "Contact us for oversized or overweight cargo"] },
              ].map((s) => (
                <div key={s.title} className="border border-border rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <s.icon className="w-6 h-6 brand-red-text" />
                    <h2 className="font-bold">{s.title}</h2>
                  </div>
                  <ul className="space-y-2">
                    {s.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" /> {item}
                      </li>
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
