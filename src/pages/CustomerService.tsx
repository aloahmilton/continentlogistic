import { useState } from "react";
import { ChevronDown, ChevronRight, AlertCircle, HelpCircle, UserPlus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";

const faqs = [
  { q: "What Is a Tracking Number & Where Can I Find It?", a: "A tracking number is a unique identifier assigned to your shipment. You can find it in the confirmation email or receipt you received when the shipment was booked." },
  { q: "When will my tracking information appear?", a: "Tracking information typically appears within 24 hours of the shipment being picked up or dropped off at a Continental Track facility." },
  { q: "Why is my tracking number/ID not working?", a: "Please double-check the number for any typos. If the issue persists, it may take up to 24 hours for the number to activate in our system." },
  { q: "If I do not have my tracking number, is it still possible to track my shipment?", a: "Yes, you can use a reference number provided at the time of booking, or contact our customer service team for assistance." },
];

export default function CustomerService() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-[#f0f0f0] border-b border-border">
        <div className="container mx-auto px-4 py-2 text-[10px] sm:text-xs">
          <Link to="/" className="brand-red-text hover:underline">Home</Link>
          <span className="mx-2 text-muted-foreground">›</span>
          <span className="text-muted-foreground">Customer Service</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-extrabold brand-red-text mb-4 tracking-tight">
                Customer Service
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-xl font-medium leading-normal">
                Your tracking number lets us find the right division contact to answer your questions.
              </p>

              <div className="flex flex-col sm:flex-row gap-0 max-w-xl mb-20 shadow-sm border border-border rounded-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Enter your tracking number(s)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1 px-5 py-4 text-base focus:outline-none bg-white"
                />
                <button 
                  onClick={() => trackingNumber && (window.location.href = `/tracking/${trackingNumber}`)}
                  className="px-8 py-4 brand-red-bg text-white text-base font-bold hover:brightness-105 transition-all active:scale-[0.98]">
                  Find Contact
                </button>
              </div>
            </ScrollReveal>

            {/* FAQ */}
            <ScrollReveal>
              <h2 className="text-2xl font-bold mb-8 border-b-2 border-primary w-fit pb-2">Frequently Asked Questions</h2>
              <div className="divide-y divide-border border-y border-border">
                {faqs.map((faq, i) => (
                  <div key={i} className="group">
                    <button
                      className="w-full flex items-center justify-between py-5 text-left text-base font-bold hover:brand-red-text transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      {faq.q}
                      <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <div className="pb-6 text-base text-muted-foreground animate-in slide-in-from-top-2 duration-300">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar - DHL Style Cards */}
          <div className="space-y-6">
            <ScrollReveal delay={100}>
              <Link to="/business-account" className="relative block bg-white border border-border rounded shadow-sm hover:shadow-md transition-all group overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-[#FFCC00] transform rotate-45 translate-x-6 -translate-y-6" />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center justify-between group-hover:brand-red-text transition-colors">
                    Request A Business Account <ChevronRight className="w-5 h-5 brand-red-text" />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Shipping regularly? Request a business account and profit from exclusive benefits</p>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Link to="/fraud-awareness" className="block bg-white border border-border rounded shadow-sm hover:shadow-md transition-all group">
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center justify-between group-hover:brand-red-text transition-colors">
                    Do you suspect you received a fraudulent email? <ChevronRight className="w-5 h-5 brand-red-text" />
                  </h3>
                  <p className="text-sm text-muted-foreground">Let us know.</p>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <Link to="/customer-portals" className="block bg-white border border-border rounded shadow-sm hover:shadow-md transition-all group">
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center justify-between group-hover:brand-red-text transition-colors">
                    No tracking number? <ChevronRight className="w-5 h-5 brand-red-text" />
                  </h3>
                  <p className="text-sm text-muted-foreground">Find your contact here.</p>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
