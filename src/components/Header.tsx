import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search, MapPin, Globe, Menu, X } from "lucide-react";
import logo from "@/assets/logo-continentaltrack.png";

const navItems = [
  { label: "Track", href: "/" },
  {
    label: "Ship",
    href: "/get-a-quote",
    children: [
      { label: "Get a Quote", href: "/get-a-quote" },
      { label: "Ship Now", href: "/ship-now" },
      { label: "Request a Business Account", href: "/business-account" },
    ],
    megaContent: {
      sections: [
        { title: "Document and Package", desc: "Express document and package shipping", href: "/ct-express" },
        { title: "Pallets, Containers and Cargo", desc: "Air and ocean freight, plus customs and logistics services", href: "/ct-global-forwarding" },
        { title: "Continental Track for Your Business", desc: "Small start-up? Medium-sized business going international? Satisfy your business shipping needs.", href: "/business-account" },
      ],
    },
  },
  {
    label: "Enterprise Logistics Services",
    href: "/enterprise-logistics",
    children: [
      { label: "Explore Supply Chain", href: "/ct-supply-chain" },
      { label: "Explore All Divisions", href: "/divisions" },
    ],
  },
  { label: "Customer Service", href: "/customer-service" },
];

const portalLinks = [
  { label: "MyCT+", href: "/customer-portals" },
  { label: "CT Express Commerce", href: "/customer-portals" },
  { label: "CT Vantage", href: "/customer-portals" },
  { label: "MyCTi", href: "/customer-portals" },
  { label: "MySupplyChain", href: "/customer-portals" },
  { label: "MyCT GTS", href: "/customer-portals" },
  { label: "CT SameDay", href: "/customer-portals" },
  { label: "LifeTrack", href: "/customer-portals" },
];

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-50">
      {/* Top bar */}
      <div className="brand-yellow-bg">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Continental Track" className="h-10 md:h-12 object-contain" />
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
            <Link to="/find-service-point" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <MapPin className="w-4 h-4" /> Find a Service Point
            </Link>
            <Link to="/shipping-guidance" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <Search className="w-4 h-4" /> Shipping Guidance
            </Link>
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4" /> United States of America
            </span>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:block border-b border-border bg-background">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-foreground hover:brand-red-text transition-colors"
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full bg-background shadow-lg border border-border min-w-[280px] z-50">
                    {item.megaContent ? (
                      <div className="p-6 grid grid-cols-2 gap-6 min-w-[600px]">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider brand-red-text mb-3">Start Shipping</p>
                          {item.children.map((child) => (
                            <Link key={child.label} to={child.href} className="flex items-center justify-between py-2 px-3 text-sm hover:bg-muted rounded transition-colors">
                              {child.label} <ChevronDown className="w-3 h-3 -rotate-90" />
                            </Link>
                          ))}
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Learn more about</p>
                          {item.megaContent.sections.map((s) => (
                            <Link key={s.title} to={s.href} className="block mb-3 hover:opacity-80 transition-opacity">
                              <p className="text-sm font-semibold">{s.title}</p>
                              <p className="text-xs text-muted-foreground">{s.desc}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link key={child.label} to={child.href} className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("portals")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link
              to="/customer-portals"
              className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-foreground hover:brand-red-text transition-colors"
            >
              Customer Portal Logins <ChevronDown className="w-3.5 h-3.5" />
            </Link>
            {openDropdown === "portals" && (
              <div className="absolute right-0 top-full bg-background shadow-lg border border-border min-w-[260px] z-50">
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Log in to</p>
                  {portalLinks.map((p) => (
                    <Link key={p.label} to={p.href} className="flex items-center justify-between py-1.5 text-sm hover:brand-red-text transition-colors">
                      {p.label} <span className="text-muted-foreground">↗</span>
                    </Link>
                  ))}
                  <Link to="/customer-portals" className="block mt-3 text-center py-2 brand-red-bg text-sm font-semibold text-primary-foreground rounded transition-opacity hover:opacity-90">
                    Learn About Portals
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[56px] bg-background z-40 overflow-y-auto">
          <div className="p-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.href}
                  className="flex items-center justify-between py-3 px-2 text-base font-medium border-b border-border"
                  onClick={() => !item.children && setMobileOpen(false)}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>
                {item.children && (
                  <div className="pl-4">
                    {item.children.map((child) => (
                      <Link key={child.label} to={child.href} className="block py-2 px-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/customer-portals"
              className="flex items-center justify-between py-3 px-2 text-base font-medium border-b border-border"
              onClick={() => setMobileOpen(false)}
            >
              Customer Portal Logins
            </Link>
            <div className="pt-4 space-y-3">
              <Link to="/find-service-point" className="flex items-center gap-2 text-sm" onClick={() => setMobileOpen(false)}><MapPin className="w-4 h-4" /> Find a Service Point</Link>
              <Link to="/shipping-guidance" className="flex items-center gap-2 text-sm" onClick={() => setMobileOpen(false)}><Search className="w-4 h-4" /> Shipping Guidance</Link>
              <span className="flex items-center gap-2 text-sm"><Globe className="w-4 h-4" /> United States of America</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
