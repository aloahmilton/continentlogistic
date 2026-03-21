import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";
import globalNetworkImg from "@/assets/global-network.jpg";

export default function About() {
  usePageSEO({ title: "About Continental Track", description: "Learn about Continental Track — a global logistics leader delivering excellence in express shipping, freight forwarding, and supply chain management." });

  return (
    <PageLayout title="About Continental Track" breadcrumb={[{ label: "Company", href: "/about" }, { label: "About" }]} heroSubtitle="A global logistics leader committed to connecting people and businesses across 220+ countries.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="md:flex gap-10 items-center mb-14">
              <div className="md:w-1/2 mb-6 md:mb-0 rounded-lg overflow-hidden">
                <img src={globalNetworkImg} alt="Global network" className="w-full h-64 object-cover" />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Continental Track is dedicated to being the logistics company for the world. We connect people and improve lives by providing excellent delivery and supply chain services that are sustainable and efficient.
                </p>
                <p className="text-sm text-muted-foreground">
                  With operations in over 220 countries, a workforce of more than 380,000 employees, and a commitment to digital innovation, we are the backbone of global trade.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid md:grid-cols-4 gap-6 text-center mb-14">
              {[
                { stat: "220+", label: "Countries Served" },
                { stat: "380K+", label: "Employees" },
                { stat: "1.8B", label: "Parcels per Year" },
                { stat: "50+", label: "Years of Experience" },
              ].map((s) => (
                <div key={s.label} className="p-6 bg-muted rounded-lg">
                  <p className="text-3xl font-bold brand-red-text mb-1">{s.stat}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="prose prose-sm max-w-none">
              <h2 className="text-xl font-bold mb-3">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Customer First", desc: "Every decision starts with how it benefits our customers. We listen, adapt, and deliver." },
                  { title: "Sustainable Logistics", desc: "We're committed to reducing our environmental footprint through green logistics initiatives and science-based emissions targets." },
                  { title: "Innovation Driven", desc: "From autonomous delivery vehicles to AI-powered route optimization, we invest in the future of logistics." },
                ].map((v) => (
                  <div key={v.title}>
                    <h3 className="font-bold text-sm mb-1">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
