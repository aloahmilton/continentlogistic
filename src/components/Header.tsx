import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, Search, MapPin, Globe, Menu, X, Truck } from "lucide-react";
import logo from "@/assets/logo-Continentlogistic.png";
import CountrySelector from "./CountrySelector";
import ShippingGuidanceDropdown from "./ShippingGuidanceDropdown";
import { Input } from "@/components/ui/input";
import { countries } from "@/utils/countries";

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
        { title: "Continent Logistic.org for Your Business", desc: "Small start-up? Medium-sized business going international? Satisfy your business shipping needs.", href: "/business-account" },
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
  { label: "MyCT+", href: "/portal/myct-plus" },
  { label: "CT Express Commerce", href: "/portal/express-commerce" },
  { label: "CT Vantage", href: "/portal/vantage" },
  { label: "MyCTi", href: "/portal/mycti" },
  { label: "MySupplyChain", href: "/portal/mysupplychain" },
  { label: "MyCT GTS", href: "/portal/myct-gts" },
  { label: "CT SameDay", href: "/portal/sameday" },
  { label: "LifeTrack", href: "/portal/lifetrack" },
];

export default function Header() {
  const { countryCode } = useParams();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState("United States of America");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (countryCode) {
      const country = countries.find(c => c.code.toLowerCase() === countryCode.toLowerCase());
      if (country) {
        setCurrentCountry(country.name);
      }
    }
  }, [countryCode]);

  return (
    <header className="relative z-50">
      <div className="brand-yellow-bg shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-2">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Continent Logistic.org" className="h-10 md:h-12 object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
            <Link to="/find-service-point" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <MapPin className="w-4 h-4" /> Find a Service Point
            </Link>

            <div className="flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center bg-white rounded shadow-sm border px-2 animate-in fade-in slide-in-from-right-2 duration-300">
                  <Input
                    autoFocus
                    placeholder="Search..."
                    className="h-8 border-none focus-visible:ring-0 w-48 text-xs bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button onClick={() => setIsSearchOpen(false)} className="p-1 hover:bg-muted rounded text-muted-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsSearchOpen(true)} className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                  <Search className="w-4 h-4" /> Search
                </button>
              )}
            </div>

            <ShippingGuidanceDropdown />
            <CountrySelector currentCountry={currentCountry} onSelect={setCurrentCountry} />
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

      <nav className="hidden md:block border-b border-border bg-background shadow-sm">
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
                  className="flex items-center gap-1 px-4 py-3 text-sm font-black uppercase tracking-tighter text-foreground hover:brand-red-text transition-colors"
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full bg-background shadow-xl border border-border min-w-[280px] z-50 rounded-b-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                    {item.megaContent ? (
                      <div className="p-6 grid grid-cols-2 gap-8 min-w-[600px]">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest brand-red-text mb-4">Start Shipping</p>
                          {item.children.map((child) => (
                            <Link key={child.label} to={child.href} className="flex items-center justify-between py-2.5 px-3 text-sm font-bold hover:bg-muted rounded-lg transition-colors group">
                              {child.label} <ChevronDown className="w-3 h-3 -rotate-90 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          ))}
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Learn more about</p>
                          {item.megaContent.sections.map((s) => (
                            <Link key={s.title} to={s.href} className="block mb-4 hover:opacity-80 transition-opacity">
                              <p className="text-sm font-black uppercase tracking-tight flex items-center gap-2">
                                <Truck className="w-3.5 h-3.5 brand-red-text" /> {s.title}
                              </p>
                              <p className="text-[10px] font-bold text-muted-foreground mt-0.5">{s.desc}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link key={child.label} to={child.href} className="block px-4 py-2.5 text-sm font-bold hover:bg-muted transition-colors">
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
              className="flex items-center gap-1 px-4 py-3 text-sm font-black uppercase tracking-tighter text-foreground hover:brand-red-text transition-colors"
            >
              Customer Portals <ChevronDown className="w-3.5 h-3.5" />
            </Link>
            {openDropdown === "portals" && (
              <div className="absolute right-0 top-full bg-background shadow-xl border border-border min-w-[260px] z-50 rounded-b-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Log in to</p>
                  {portalLinks.map((p) => (
                    <Link key={p.label} to={p.href} className="flex items-center justify-between py-2 text-sm font-bold hover:brand-red-text transition-colors group">
                      {p.label} <span className="text-muted-foreground group-hover:translate-x-0.5 transition-transform opacity-50 group-hover:opacity-100">↗</span>
                    </Link>
                  ))}
                  <Link to="/customer-portals" className="block mt-4 text-center py-2.5 brand-red-bg text-xs font-black uppercase tracking-widest text-primary-foreground rounded-lg shadow-md transition-all hover:shadow-lg active:scale-[0.98]">
                    Explore All Portals
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[56px] bg-background z-40 overflow-y-auto animate-in slide-in-from-right duration-300">
          <div className="p-4 space-y-1 pb-20">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.href}
                  className="flex items-center justify-between py-4 px-2 text-base font-black uppercase tracking-tight border-b border-border"
                  onClick={() => !item.children && setMobileOpen(false)}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>
                {item.children && (
                  <div className="pl-4 bg-muted/20">
                    {item.children.map((child) => (
                      <Link key={child.label} to={child.href} className="block py-3 px-2 text-sm font-bold text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/customer-portals"
              className="flex items-center justify-between py-4 px-2 text-base font-black uppercase tracking-tight border-b border-border"
              onClick={() => setMobileOpen(false)}
            >
              Customer Portals
            </Link>
            <div className="pt-6 space-y-6">
              <Link to="/find-service-point" className="flex items-center gap-3 text-sm font-bold" onClick={() => setMobileOpen(false)}>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"><MapPin className="w-4 h-4 brand-red-text" /></div>
                Find a Service Point
              </Link>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Global Search..."
                  className="pl-10 h-12 border-border bg-muted/30 rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="bg-muted/30 p-4 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 brand-red-text" />
                  <CountrySelector currentCountry={currentCountry} onSelect={(c) => { setCurrentCountry(c); setMobileOpen(false); }} />
                </div>
                <ShippingGuidanceDropdown />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
