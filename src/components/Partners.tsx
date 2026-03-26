import ScrollReveal from "@/components/ScrollReveal";

const partners = [
  {
    name: "FedEx",
    abbr: "FedEx",
    color: "#4D148C",
    accent: "#FF6200",
  },
  {
    name: "DHL",
    abbr: "DHL",
    color: "#FFCC00",
    accent: "#D40511",
  },
  {
    name: "UPS",
    abbr: "UPS",
    color: "#351C15",
    accent: "#FFB500",
  },
  {
    name: "Maersk",
    abbr: "Maersk",
    color: "#00243D",
    accent: "#42B0D5",
  },
  {
    name: "MSC",
    abbr: "MSC",
    color: "#003087",
    accent: "#E4002B",
  },
  {
    name: "Amazon Logistics",
    abbr: "Amazon",
    color: "#232F3E",
    accent: "#FF9900",
  },
  {
    name: "Hapag-Lloyd",
    abbr: "Hapag-Lloyd",
    color: "#00305E",
    accent: "#F07800",
  },
  {
    name: "TNT",
    abbr: "TNT",
    color: "#FF6600",
    accent: "#333333",
  },
  {
    name: "Shopify",
    abbr: "Shopify",
    color: "#96BF48",
    accent: "#5E8E3E",
  },
  {
    name: "DB Schenker",
    abbr: "DB Schenker",
    color: "#EC0016",
    accent: "#1A1A1A",
  },
  {
    name: "Kuehne+Nagel",
    abbr: "K+N",
    color: "#0047BB",
    accent: "#FFFFFF",
  },
  {
    name: "CEVA Logistics",
    abbr: "CEVA",
    color: "#005EB8",
    accent: "#E8E8E8",
  },
];

// Duplicate for seamless infinite loop
const allPartners = [...partners, ...partners];

export default function Partners() {
  return (
    <ScrollReveal>
      <section className="py-14 overflow-hidden" aria-label="Our global partners">
        <div className="container mx-auto px-4 mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest brand-red-text mb-2">
            Trusted by the world's best
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Our Global Partners
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            We collaborate with industry-leading brands to ensure your shipments
            are handled with world-class expertise at every step of the journey.
          </p>
        </div>

        {/* Marquee track */}
        <div className="relative w-full">
          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-background to-transparent" />
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-background to-transparent" />

          <div className="partners-marquee flex gap-6 w-max">
            {allPartners.map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex-shrink-0 flex flex-col items-center justify-center w-36 h-20 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group cursor-default"
                title={partner.name}
              >
                {/* Logo placeholder — coloured badge with abbreviation */}
                <div
                  className="flex items-center justify-center rounded-lg px-3 py-1.5 mb-1"
                  style={{ backgroundColor: partner.color }}
                >
                  <span
                    className="text-xs font-extrabold tracking-wide whitespace-nowrap"
                    style={{ color: partner.accent }}
                  >
                    {partner.abbr}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors leading-tight text-center px-2">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
