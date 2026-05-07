import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found | Continent Logistic.org";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-6xl font-bold brand-red-text mb-4">404</p>
          <h1 className="text-2xl font-bold mb-2">Page not found</h1>
          <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="brand-red-bg text-primary-foreground text-sm font-semibold px-6 py-3 rounded hover:opacity-90 transition-opacity active:scale-[0.98]">
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
