import { useState, FormEvent } from "react";
import { Building2, Briefcase, Mail, Phone, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PortalRegister() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    contactName: "",
    email: "",
    phone: "",
    shippingVolume: "occasional",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Business account request submitted! Our team will contact you within 24 hours with your credentials.");
      navigate("/portal-login");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 bg-background rounded-xl shadow-2xl overflow-hidden">
            {/* Left Side - Info */}
            <div className="brand-red-bg p-12 text-white flex flex-col justify-center">
              <h1 className="text-3xl font-black mb-6 leading-tight">Grow Your Business Internationally</h1>
              <p className="text-lg opacity-90 mb-8">
                Join thousands of businesses using Continental Track to streamline their global logistics, track shipments in real-time, and manage invoices seamlessly.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                  Customized Business Pricing
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                  Dedicated Account Manager
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                  Integrated Warehouse Insights
                </li>
              </ul>
              <div className="mt-12 pt-12 border-t border-white/20">
                <p className="text-sm font-bold opacity-70 uppercase tracking-widest">Global Logistics Excellence</p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-12">
              <h2 className="text-2xl font-bold mb-2">Register Business Account</h2>
              <p className="text-sm text-muted-foreground mb-8">Fill in your company details to request portal access.</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Company Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        placeholder="Company Ltd."
                        className="w-full pl-10 pr-4 py-3 bg-muted/50 border-none rounded-md focus:ring-2 focus:ring-primary transition-all outline-none"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Industry</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <select
                        required
                        className="w-full pl-10 pr-4 py-3 bg-muted/50 border-none rounded-md focus:ring-2 focus:ring-primary transition-all outline-none appearance-none"
                        value={formData.industry}
                        onChange={(e) => setFormData({...formData, industry: e.target.value})}
                      >
                        <option value="">Select Industry</option>
                        <option value="ecommerce">E-commerce / Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="healthcare">Healthcare / Life Sciences</option>
                        <option value="technology">Technology</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-muted/50 border-none rounded-md focus:ring-2 focus:ring-primary transition-all outline-none"
                        value={formData.contactName}
                        onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Business Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          className="w-full pl-10 pr-4 py-3 bg-muted/50 border-none rounded-md focus:ring-2 focus:ring-primary transition-all outline-none"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-muted-foreground">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="tel"
                          required
                          placeholder="+237 ..."
                          className="w-full pl-10 pr-4 py-3 bg-muted/50 border-none rounded-md focus:ring-2 focus:ring-primary transition-all outline-none"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 brand-red-bg text-white rounded-md font-bold text-lg hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : (
                      <>
                        Request Access <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
                
                <p className="text-[10px] text-muted-foreground text-center mt-4">
                  By clicking "Request Access", you agree to our Terms of Use and Privacy Policy. Continental Track Logistics Group.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
