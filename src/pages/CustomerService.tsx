import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

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
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="brand-gray-bg border-b border-border">
        <div className="container mx-auto px-4 py-2 text-xs">
          <span className="brand-red-text">Home</span>
          <span className="mx-2 text-muted-foreground">›</span>
          <span className="text-muted-foreground">Customer Service</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="md:flex gap-12">
          {/* Main content */}
          <div className="md:w-2/3 mb-10 md:mb-0">
            <ScrollReveal>
              <h1 className="text-3xl md:text-4xl font-bold brand-red-text mb-3" style={{ lineHeight: 1.1 }}>
                Customer Service
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Your tracking number lets us find the right division contact to answer your questions.
              </p>

              <div className="flex gap-0 max-w-lg mb-16">
                <input
                  type="text"
                  placeholder="Enter your tracking number(s)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm border border-r-0 border-border rounded-l focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button className="px-6 py-3 brand-red-bg text-primary-foreground text-sm font-semibold rounded-r hover:opacity-90 transition-opacity active:scale-[0.98]">
                  Find Contact
                </button>
              </div>
            </ScrollReveal>

            {/* FAQ */}
            <ScrollReveal>
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="divide-y divide-border">
                {faqs.map((faq, i) => (
                  <div key={i}>
                    <button
                      className="w-full flex items-center justify-between py-4 text-left text-sm font-medium hover:text-foreground/80 transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      {faq.q}
                      <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <p className="pb-4 text-sm text-muted-foreground">{faq.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/3 space-y-4">
            <ScrollReveal delay={100}>
              <a href="#" className="block border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-sm mb-1 flex items-center gap-1">
                  Request A Business Account <ChevronRight className="w-4 h-4" />
                </h3>
                <p className="text-xs text-muted-foreground">Shipping regularly? Request a business account and profit from exclusive benefits</p>
              </a>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <a href="#" className="block border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-sm mb-1 flex items-center gap-1">
                  Do you suspect you received a fraudulent email? <ChevronRight className="w-4 h-4" />
                </h3>
                <p className="text-xs text-muted-foreground">Let us know.</p>
              </a>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <a href="#" className="block border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-sm mb-1 flex items-center gap-1">
                  No tracking number? <ChevronRight className="w-4 h-4" />
                </h3>
                <p className="text-xs text-muted-foreground">Find your contact here.</p>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
