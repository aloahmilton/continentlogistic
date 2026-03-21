import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ChevronRight, Layout, Shield, TrendingUp, Globe, Truck, Package, Clock, Activity } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const portals = [
  { 
    name: "MyCT+", 
    desc: "The all-in-one portal for your business shipping needs.",
    icon: Layout,
    color: "bg-blue-500",
    href: "/portal/myct-plus"
  },
  { 
    name: "CT Express Commerce", 
    desc: "Manage your e-commerce shipments and logistics.",
    icon: Package,
    color: "bg-green-500",
    href: "/portal/express-commerce"
  },
  { 
    name: "CT Vantage", 
    desc: "Deep visibility into your supply chain performance.",
    icon: TrendingUp,
    color: "bg-purple-500",
    href: "/portal/vantage"
  },
  { 
    name: "MyCTi", 
    desc: "Interactive shipment management for global trade.",
    icon: Globe,
    color: "bg-orange-500",
    href: "/portal/mycti"
  },
  { 
    name: "MySupplyChain", 
    desc: "End-to-end supply chain management and reporting.",
    icon: Shield,
    color: "bg-indigo-500",
    href: "/portal/mysupplychain"
  },
  { 
    name: "MyCT GTS", 
    desc: "Global Trade Services and customs compliance.",
    icon: Activity,
    color: "bg-red-500",
    href: "/portal/myct-gts"
  },
  { 
    name: "CT SameDay", 
    desc: "Critical and time-sensitive shipment solutions.",
    icon: Clock,
    color: "bg-yellow-500",
    href: "/portal/sameday"
  },
  { 
    name: "LifeTrack", 
    desc: "Specialized logistics for the life sciences sector.",
    icon: Truck,
    color: "bg-teal-500",
    href: "/portal/lifetrack"
  },
];

export default function PortalLanding() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      
      {/* Hero Section */}
      <div className="brand-gray-bg py-16 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase">Customer Portal Logins</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select your Continental Track portal to manage your shipments, view reports, and optimize your global logistics operations.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Portals Grid */}
      <div className="container mx-auto px-4 py-20 flex-1">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {portals.map((portal, i) => (
            <ScrollReveal key={portal.name} delay={i * 50}>
              <Link 
                to={portal.href}
                className="group flex flex-col h-full bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg ${portal.color} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                  <portal.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:brand-red-text transition-colors flex items-center justify-between">
                  {portal.name} <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{portal.desc}</p>
                <div className="text-xs font-black uppercase tracking-widest text-primary pt-4 border-t border-border/50 group-hover:translate-x-1 transition-transform">
                  Login Securely ↗
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-20 p-10 bg-white border border-border rounded-2xl shadow-sm text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-bold mb-4">Need help choosing a portal?</h2>
            <p className="text-muted-foreground mb-8">
              Our customer service team is available 24/7 to help you find the right tool for your specific business needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/customer-service" className="px-8 py-3 brand-red-bg text-white font-bold rounded hover:brightness-110 transition-all">
                Contact Customer Service
              </Link>
              <Link to="/about" className="px-8 py-3 border border-border font-bold rounded hover:bg-muted transition-all">
                Learn More About Our Divisions
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <Footer />
    </div>
  );
}
