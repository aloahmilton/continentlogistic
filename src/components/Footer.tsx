import { Link } from "react-router-dom";
import logo from "@/assets/logo-continentaltrack.png";

const footerColumns = [
  {
    title: "Quick Links",
    links: [
      { label: "Customer Service", href: "/customer-service" },
      { label: "Customer Portal Logins", href: "/customer-portals" },
      { label: "Strategic Partner Directory", href: "/partner-directory" },
      { label: "Developer Portal", href: "/developer-portal" },
      { label: "Get a Quote", href: "/get-a-quote" },
      { label: "Request a Business Account", href: "/business-account" },
      { label: "CT for Your Business", href: "/business-account" },
      { label: "CT for Your Business", href: "/business-account" },
      { label: "Shipping Guidance", href: "/shipping-guidance" },
    ],
  },
  {
    title: "Our Divisions",
    links: [
      { label: "CT Express", href: "/ct-express" },
      { label: "CT Global Forwarding", href: "/ct-global-forwarding" },
      { label: "CT Supply Chain", href: "/ct-supply-chain" },
      { label: "CT eCommerce", href: "/ct-ecommerce" },
      { label: "Other Global Divisions", href: "/divisions" },
    ],
  },
  {
    title: "Industry Sectors",
    links: [
      { label: "Auto-Mobility", href: "/industry-sectors" },
      { label: "Energy", href: "/industry-sectors" },
      { label: "Engineering and Manufacturing", href: "/industry-sectors" },
      { label: "Life Sciences and Healthcare", href: "/industry-sectors" },
      { label: "Retail and Fashion", href: "/industry-sectors" },
      { label: "Technology", href: "/industry-sectors" },
    ],
  },
  {
    title: "Company Information",
    links: [
      { label: "About Continental Track", href: "/about" },
      { label: "Delivered Magazine", href: "/careers" },
      { label: "Careers", href: "/careers" },
      { label: "Press Center", href: "/press" },
      { label: "Investors", href: "/investors" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Supplier Diversity", href: "/sustainability" },
      { label: "Innovation", href: "/innovation" },
      { label: "Events", href: "/events" },
      { label: "Brand Partnerships", href: "/about" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold brand-red-text mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/">
            <img src={logo} alt="Continental Track" className="h-10 object-contain" />
          </Link>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/fraud-awareness" className="hover:text-foreground transition-colors">Fraud Awareness</Link>
            <Link to="/legal" className="hover:text-foreground transition-colors">Legal Notice</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Use</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Notice</Link>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground pb-4">
          2026 © Continental Track — all rights reserved
        </div>
      </div>
    </footer>
  );
}
