import { ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import globalNetworkImg from "@/assets/global-network.jpg";
import airFreightImg from "@/assets/air-freight.jpg";
import oceanFreightImg from "@/assets/ocean-freight.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import supplyChainImg from "@/assets/supply-chain.jpg";

const portals = [
  {
    category: "Document and Parcel",
    items: [
      {
        name: "MyCT+",
        desc: "The MyCT+ platform allows CT Express customers or guests to import, export, schedule a pickup and track shipments more quickly. Whether you're a small business or a global corporation, MyCT+ makes it easy to navigate the complexities of international shipping.",
        img: globalNetworkImg,
        link: "#",
      },
      {
        name: "CT Vantage",
        desc: "CT Vantage allows CT eCommerce customers to manage their shipments with CT eCommerce. Key features include creating labels, tracking shipments, managing returns and access to performance reporting and analytics.",
        img: airFreightImg,
        link: "#",
      },
      {
        name: "MyCT GTS - My Global Trade Services from CT Express",
        desc: "Whether you're a small business or a growing e-commerce merchant, we can help you reach new markets across the world. Our CT Express Global Trade Services makes it easy to get your shipments through customs.",
        img: oceanFreightImg,
        link: "#",
      },
      {
        name: "CT Express Commerce Solution",
        desc: "CT Express Commerce is an end-to-end e-commerce solution that seamlessly integrates with leading platforms and marketplaces, providing comprehensive features that streamline workflows, enable swift order dispatch, and free up valuable time to focus on expanding your business.",
        img: warehouseImg,
        link: "#",
      },
    ],
  },
  {
    category: "Pallets, Containers and Other Cargo",
    items: [
      {
        name: "myCTi",
        desc: "The CT Global Forwarding Portal for all your logistics needs that gives you 360° visibility and full control over your shipments. Quote + Book, Track, Documents, Analytics — everything at your fingertips.",
        img: globalNetworkImg,
        link: "#",
      },
    ],
  },
  {
    category: "Supply Chain",
    items: [
      {
        name: "MySupplyChain",
        desc: "MySupplyChain is the CT Supply Chain one-stop-shop for integrated warehouse and transportation insights — accessible anytime, from anywhere you are online.",
        img: supplyChainImg,
        link: "#",
      },
    ],
  },
  {
    category: "Same Day",
    items: [
      {
        name: "CT SameDay",
        desc: "Whether it's across town or overseas, whether you're shipping an urgent document or a time-critical medical shipment, CT Same Day offers a customized shipping solution designed to meet your needs.",
        img: airFreightImg,
        link: "#",
      },
    ],
  },
  {
    category: "Life Sciences & Temperature-Controlled Shipments",
    items: [
      {
        name: "LifeTrack",
        desc: "LifeTrack is a validated, secure, and auditable system designed for Life Science & Healthcare's regulated supply chain, with a focus on temperature control and compliance.",
        img: oceanFreightImg,
        link: "#",
      },
    ],
  },
];

export default function CustomerPortals() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Intro */}
      <section className="brand-gray-bg py-12">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ lineHeight: 1.1 }}>Customer Portals</h1>
            <p className="text-sm text-muted-foreground max-w-2xl mb-4">
              Our divisions offer a number of online tools for their business customers with easy login and account management. Contact your sales representative for login credentials.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-muted-foreground">Jump to:</span>
              {portals.map((p) => (
                <a key={p.category} href={`#${p.category.replace(/\s+/g, "-")}`} className="brand-red-text hover:underline">
                  {p.category}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Portal Sections */}
      {portals.map((section, si) => (
        <section key={section.category} id={section.category.replace(/\s+/g, "-")} className={si % 2 === 0 ? "bg-background" : "brand-gray-bg"}>
          <div className="container mx-auto px-4 py-12">
            <ScrollReveal>
              <h2 className="text-2xl font-bold mb-8">{section.category}</h2>
            </ScrollReveal>
            <div className="space-y-10">
              {section.items.map((item, i) => (
                <ScrollReveal key={item.name} delay={i * 80}>
                  <div className="md:flex gap-8 items-start">
                    <div className="md:w-64 flex-shrink-0 mb-4 md:mb-0">
                      <div className="w-full h-40 rounded-lg overflow-hidden border-l-4 border-primary">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                      <a
                        href={item.link}
                        className="inline-flex items-center gap-1 brand-red-text text-sm font-medium hover:underline"
                      >
                        Log in to {item.name} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
}
