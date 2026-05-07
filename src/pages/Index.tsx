import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, FileText, Building2, Truck, Plane, Ship, ChevronRight, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Partners from "@/components/Partners";
import heroImg from "@/assets/hero-logistics.jpg";
import couriersImg from "@/assets/couriers.jpg";
import oceanFreightImg from "@/assets/ocean-freight.jpg";
import warehouseImg from "@/assets/warehouse.jpg";
import supplyChainImg from "@/assets/supply-chain.jpg";
import businessImg from "@/assets/business-solutions.jpg";

export default function Index() {
  const [trackingNumber, setTrackingNumber] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Global logistics port" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 animate-fade-up" style={{ lineHeight: 1.1 }}>
              Track Your Shipment
            </h1>
            <div className="flex gap-0 animate-fade-up-delay-1">
              <input
                type="text"
                placeholder="Enter your tracking number(s)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && trackingNumber.trim() && (window.location.href = `/tracking/${trackingNumber.trim().toUpperCase()}`)}
                className="flex-1 px-4 py-3 text-sm bg-background rounded-l border border-r-0 border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button 
                onClick={() => trackingNumber.trim() && (window.location.href = `/tracking/${trackingNumber.trim().toUpperCase()}`)}
                className="px-6 py-3 brand-red-bg text-primary-foreground text-sm font-semibold rounded-r hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                Track
              </button>
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap gap-3 mt-6 animate-fade-up-delay-2">
              {[
                { icon: Package, label: "Ship Now", sub: "Parcel Express Service", to: "/ship-now" },
                { icon: FileText, label: "Get a Quote", sub: "For your next shipment", to: "/get-a-quote" },
                { icon: Building2, label: "Request a Business Account", sub: "For regular shipping needs", to: "/business-account" },
              ].map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className="flex items-center gap-3 bg-background/95 rounded px-4 py-3 text-sm hover:shadow-md transition-shadow active:scale-[0.98]"
                >
                  <action.icon className="w-5 h-5 brand-red-text flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tariff Banner */}
      <ScrollReveal>
        <section className="brand-yellow-bg">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <h2 className="text-lg md:text-xl font-bold mb-1">Navigating Latest Tariff Developments</h2>
            <p className="text-sm text-foreground/80 mb-3 max-w-2xl">
              Global trade is constantly evolving with complex tariffs and surging cross-border trade volumes. As a trusted logistics partner, Continent Logistic.org is here to help you navigate those changes.
            </p>
            <Link to="/shipping-guidance" className="inline-block brand-red-bg text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded hover:opacity-90 transition-opacity active:scale-[0.98]">
              Explore Our Solutions
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Partners */}
      <Partners />

      {/* Document and Parcel Shipping */}
      <ScrollReveal>
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-muted rounded-lg overflow-hidden md:flex">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Document and Parcel Shipping</h2>
              <p className="text-sm text-muted-foreground italic mb-4">For All Shippers</p>
              <p className="text-sm text-muted-foreground mb-6">
                Learn about CT Express — the world's trusted global leader in international express shipping.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {["Time-Flexible Business Tiers", "Tailored Business Solutions", "Flexible Import & Export Options", "Wide Variety of Optional Services"].map((s) => (
                  <div key={s} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 brand-red-text flex-shrink-0 mt-0.5" /> {s}
                  </div>
                ))}
              </div>
              <Link to="/ct-express" className="inline-block brand-red-bg text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded hover:opacity-90 transition-opacity active:scale-[0.98] self-start">
                Explore CT Express
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src={couriersImg} alt="Couriers" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Retailer / Volume Shipping */}
      <ScrollReveal>
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto md:flex md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Retailer or Volume Shipping</h2>
              <p className="text-sm text-muted-foreground italic mb-4">Business Only</p>
              <p className="text-sm text-muted-foreground mb-6">
                We have two divisions that offer reliable business shipping for e-commerce, supplier or manufacturing companies.
              </p>
              <div className="space-y-3">
                {[
                  { name: "CT eCommerce", desc: "Connect your e-commerce to consumers with last-mile delivery", to: "/ct-ecommerce" },
                  { name: "CT Express", desc: "Fast, day-definite, time-definite delivery", to: "/ct-express" },
                ].map((d) => (
                  <Link key={d.name} to={d.to} className="block p-4 border border-border rounded hover:shadow-md transition-shadow">
                    <p className="font-semibold brand-red-text text-sm">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 rounded-lg overflow-hidden">
              <img src={warehouseImg} alt="Warehouse" className="w-full h-64 md:h-80 object-cover" />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Cargo Shipping */}
      <ScrollReveal>
        <section className="brand-gray-bg">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto md:flex items-center gap-12">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Cargo Shipping</h2>
                <p className="text-sm text-muted-foreground italic mb-4">Business Only</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Discover shipping and logistics on any scale from CT Global Forwarding.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: Plane, label: "Air Freight" },
                    { icon: Ship, label: "Ocean Freight" },
                    { icon: Truck, label: "Road Freight" },
                    { icon: Package, label: "Rail Freight" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-2 text-sm">
                      <s.icon className="w-4 h-4 brand-red-text" /> {s.label}
                    </div>
                  ))}
                </div>
                <Link to="/ct-global-forwarding" className="inline-block brand-red-bg text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded hover:opacity-90 transition-opacity active:scale-[0.98]">
                  Explore CT Global Forwarding
                </Link>
              </div>
              <div className="md:w-1/2 rounded-lg overflow-hidden">
                <img src={oceanFreightImg} alt="Ocean freight" className="w-full h-64 md:h-80 object-cover" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Enterprise Logistics */}
      <ScrollReveal>
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto md:flex md:flex-row-reverse items-center gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Enterprise Logistics Services</h2>
              <p className="text-sm text-muted-foreground italic mb-4">Business Only</p>
              <p className="text-sm text-muted-foreground mb-6">
                Find out how CT Supply Chain can transform your business as a 3PL provider.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Warehousing", "Packaging", "Real Estate", "Transport", "Service Logistics", "Archimod"].map((s) => (
                  <span key={s} className="flex items-center gap-1.5 text-sm">
                    <Check className="w-3.5 h-3.5 brand-red-text" /> {s}
                  </span>
                ))}
              </div>
              <Link to="/ct-supply-chain" className="inline-block brand-red-bg text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded hover:opacity-90 transition-opacity active:scale-[0.98]">
                Explore CT Supply Chain
              </Link>
            </div>
            <div className="md:w-1/2 rounded-lg overflow-hidden">
              <img src={supplyChainImg} alt="Supply chain" className="w-full h-64 md:h-80 object-cover" />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Business CTA */}
      <ScrollReveal>
        <section className="relative">
          <img src={businessImg} alt="Business solutions" className="w-full h-48 md:h-64 object-cover" />
          <div className="absolute inset-0 bg-foreground/60 flex items-center">
            <div className="container mx-auto px-4">
              <h2 className="text-xl md:text-2xl font-bold text-primary-foreground mb-2">Continent Logistic.org for Your Business</h2>
              <p className="text-sm text-primary-foreground/80 mb-4 max-w-lg">
                Power your brand's cross-border success with world-class shipping and logistics. Our team of experts can help you address the ever-changing needs of your customers.
              </p>
              <Link to="/business-account" className="inline-block brand-red-bg text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded hover:opacity-90 transition-opacity active:scale-[0.98]">
                Explore Our Business Solutions
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Service Updates */}
      <ScrollReveal>
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold mb-2">Important Service Updates</h2>
          <p className="text-sm text-muted-foreground mb-6">Service bulletins keep you up to date with news and alerts</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Sustainability", desc: "Setting sustainable benchmarks in the entire logistics industry with science-based targets to reduce emissions.", to: "/sustainability" },
              { title: "Innovation", desc: "Discover the future of logistics through our partnerships, leading robotics and drone innovation.", to: "/innovation" },
              { title: "Global Connectivity", desc: "Continent Logistic.org's global connectedness report outlines growth in globalized trade.", to: "/press" },
            ].map((item, i) => (
              <Link key={item.title} to={item.to} className="group block border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 brand-yellow-bg flex items-center justify-center">
                  <span className="text-4xl font-bold text-foreground/20">{i + 1}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold mb-1 group-hover:brand-red-text transition-colors flex items-center gap-1">
                    {item.title} <ChevronRight className="w-4 h-4" />
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <Footer />
    </div>
  );
}
