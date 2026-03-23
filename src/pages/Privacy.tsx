import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

const sections = [
  { title: "1. Data Controller", content: "Continental Track International GmbH, Logistics Avenue 1, 10115 Berlin, Germany, is the data controller responsible for the processing of your personal data." },
  { title: "2. Data We Collect", content: "We collect personal data you provide directly (name, email, phone, address) and data collected automatically (IP address, browser type, cookies, usage analytics). For shipping services, we also process shipment details and delivery addresses." },
  { title: "3. Purpose of Processing", content: "Your data is processed to provide shipping and logistics services, manage your account, improve our website and services, comply with legal obligations, and send service communications. Marketing communications require your explicit consent." },
  { title: "4. Data Sharing", content: "We share data with Continental Track group companies, authorized service partners for delivery, customs authorities as required by law, and technology partners operating on our behalf. We do not sell personal data to third parties." },
  { title: "5. Data Retention", content: "Personal data is retained for the duration of our business relationship and as required by applicable law (typically 6–10 years for commercial records). You may request deletion at any time, subject to legal retention requirements." },
  { title: "6. Your Rights", content: "Under GDPR and applicable laws, you have the right to access, rectify, erase, restrict processing, data portability, and object to processing of your personal data. Contact our Data Protection Officer at continentaltrack01@gmail.com." },
  { title: "7. Cookies", content: "This website uses essential cookies for functionality and optional cookies for analytics and personalization. You can manage cookie preferences through your browser settings or our cookie consent banner." },
];

export default function Privacy() {
  usePageSEO({ title: "Privacy Notice", description: "Continental Track privacy notice — how we collect, use, store, and protect your personal data in compliance with GDPR." });

  return (
    <PageLayout title="Privacy Notice" breadcrumb={[{ label: "Privacy Notice" }]}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="space-y-8">
              {sections.map((s) => (
                <section key={s.title}>
                  <h2 className="text-lg font-bold mb-2">{s.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
                </section>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-10">Last updated: March 1, 2026</p>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
