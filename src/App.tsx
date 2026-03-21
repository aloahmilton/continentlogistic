import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Tracking from "./pages/Tracking";
import CustomerService from "./pages/CustomerService";
import CustomerPortals from "./pages/CustomerPortals";
import PortalLogin from "./pages/PortalLogin";
import PortalRegister from "./pages/PortalRegister";
import UserDashboard from "./pages/UserDashboard";
import GetAQuote from "./pages/GetAQuote";
import ShipNow from "./pages/ShipNow";
import BusinessAccount from "./pages/BusinessAccount";
import CountryGuide from "./pages/guides/CountryGuide";
import EnterpriseLogistics from "./pages/EnterpriseLogistics";
import CTExpress from "./pages/CTExpress";
import CTGlobalForwarding from "./pages/CTGlobalForwarding";
import CTSupplyChain from "./pages/CTSupplyChain";
import CTEcommerce from "./pages/CTEcommerce";
import Divisions from "./pages/Divisions";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Investors from "./pages/Investors";
import Sustainability from "./pages/Sustainability";
import Innovation from "./pages/Innovation";
import Events from "./pages/Events";
import FindServicePoint from "./pages/FindServicePoint";
import ShippingGuidance from "./pages/ShippingGuidance";
import DeveloperPortal from "./pages/DeveloperPortal";
import PartnerDirectory from "./pages/PartnerDirectory";
import IndustrySectors from "./pages/IndustrySectors";
import FraudAwareness from "./pages/FraudAwareness";
import Legal from "./pages/Legal";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminShipments from "./pages/admin/Shipments";
import AdminLeads from "./pages/admin/Leads";
import AdminCustomers from "./pages/admin/Customers";
import AdminDrivers from "./pages/admin/Drivers";
import AdminInvoices from "./pages/admin/Invoices";
import AdminReports from "./pages/admin/Reports";
import AdminTrackingMap from "./pages/admin/TrackingMap";
import AdminProfile from "./pages/admin/Profile";
import AdminMessages from "./pages/admin/Messages";
import AdminPlaceholder from "./pages/admin/Placeholder";

import AdminGuard from "@/components/admin/AdminGuard";

const queryClient = new QueryClient();

const App = () => {
  const adminSlug = import.meta.env.VITE_ADMIN_SLUG || "admin";
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tracking/:id" element={<Tracking />} />
            <Route path="/customer-service" element={<CustomerService />} />
            <Route path="/customer-portals" element={<CustomerPortals />} />
            <Route path="/portal/:id" element={<PortalLogin />} />
            <Route path="/portal-login" element={<PortalLogin />} />
            <Route path="/portal-register" element={<PortalRegister />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/get-a-quote" element={<GetAQuote />} />
            <Route path="/ship-now" element={<ShipNow />} />
            <Route path="/business-account" element={<BusinessAccount />} />
            <Route path="/guides/:countryCode" element={<CountryGuide />} />
            <Route path="/enterprise-logistics" element={<EnterpriseLogistics />} />
            <Route path="/ct-express" element={<CTExpress />} />
            <Route path="/ct-global-forwarding" element={<CTGlobalForwarding />} />
            <Route path="/ct-supply-chain" element={<CTSupplyChain />} />
            <Route path="/ct-ecommerce" element={<CTEcommerce />} />
            <Route path="/divisions" element={<Divisions />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/innovation" element={<Innovation />} />
            <Route path="/events" element={<Events />} />
            <Route path="/find-service-point" element={<FindServicePoint />} />
            <Route path="/shipping-guidance" element={<ShippingGuidance />} />
            <Route path="/developer-portal" element={<DeveloperPortal />} />
            <Route path="/partner-directory" element={<PartnerDirectory />} />
            <Route path="/industry-sectors" element={<IndustrySectors />} />
            <Route path="/fraud-awareness" element={<FraudAwareness />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Admin Routes with Slug & Guard */}
            <Route 
              path={`/${adminSlug}`} 
              element={<AdminGuard><AdminDashboard /></AdminGuard>} 
            />
            <Route 
              path={`/${adminSlug}/shipments`} 
              element={<AdminGuard><AdminShipments /></AdminGuard>} 
            />
            <Route 
              path={`/${adminSlug}/leads`} 
              element={<AdminGuard><AdminLeads /></AdminGuard>} 
            />
            <Route 
              path={`/${adminSlug}/tracking-map`} 
              element={<AdminGuard><AdminTrackingMap /></AdminGuard>} 
            />
            <Route 
              path={`/${adminSlug}/customers`} 
              element={<AdminGuard><AdminCustomers /></AdminGuard>} 
            />
            <Route 
              path={`/${adminSlug}/drivers`} 
              element={<AdminGuard><AdminDrivers /></AdminGuard>} 
            />
            <Route 
              path={`/${adminSlug}/invoices`} 
              element={<AdminGuard><AdminInvoices /></AdminGuard>} 
            />
            <Route 
              path={`/${adminSlug}/reports`} 
              element={<AdminGuard><AdminReports /></AdminGuard>} 
            />
            <Route 
              path={`/${adminSlug}/profile`} 
              element={<AdminGuard><AdminProfile /></AdminGuard>} 
            />
            <Route 
              path={`/${adminSlug}/messages`} 
              element={<AdminGuard><AdminMessages /></AdminGuard>} 
            />
            <Route 
              path={`/${adminSlug}/settings`} 
              element={<Navigate to={`/${adminSlug}/profile`} replace />} 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
