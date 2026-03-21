import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

interface PageLayoutProps {
  title: string;
  breadcrumb: { label: string; href?: string }[];
  children: React.ReactNode;
  heroSubtitle?: string;
}

export default function PageLayout({ title, breadcrumb, children, heroSubtitle }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="brand-gray-bg border-b border-border">
        <div className="container mx-auto px-4 py-2 text-xs flex items-center gap-1">
          <Link to="/" className="brand-red-text hover:underline">Home</Link>
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="text-muted-foreground mx-1">›</span>
              {item.href ? (
                <Link to={item.href} className="brand-red-text hover:underline">{item.label}</Link>
              ) : (
                <span className="text-muted-foreground">{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="brand-gray-bg py-10 md:py-14">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h1 className="text-3xl md:text-4xl font-bold brand-red-text mb-2" style={{ lineHeight: 1.1 }}>
              {title}
            </h1>
            {heroSubtitle && (
              <p className="text-base text-muted-foreground max-w-2xl">{heroSubtitle}</p>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Content */}
      <div className="flex-1">
        {children}
      </div>

      <Footer />
    </div>
  );
}
