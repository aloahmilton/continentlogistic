import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

const sections = [
  { title: "1. General", content: "These Terms of Use govern your access to and use of the Continent Logistic.org website and digital services. By accessing this website, you agree to these terms in full. If you disagree with any part, you must discontinue use immediately." },
  { title: "2. Services", content: "Continent Logistic.org provides logistics, shipping, and supply chain services. Service availability, pricing, and transit times are subject to the specific terms of each division and product. Quotes are non-binding until a formal agreement is executed." },
  { title: "3. User Accounts", content: "Certain features require registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized access." },
  { title: "4. Intellectual Property", content: "All content, trademarks, logos, and intellectual property on this website belong to Continent Logistic.org International GmbH. You may not reproduce, distribute, or create derivative works without express written permission." },
  { title: "5. Limitation of Liability", content: "Continent Logistic.org shall not be liable for indirect, incidental, special, or consequential damages arising from the use of this website. Our liability is limited to the maximum extent permitted by applicable law." },
  { title: "6. Governing Law", content: "These terms are governed by the laws of the Federal Republic of Germany. Any disputes shall be subject to the exclusive jurisdiction of the courts in Berlin, Germany." },
];

export default function Terms() {
  usePageSEO({ title: "Terms of Use", description: "Continent Logistic.org terms of use — conditions governing the use of our website, services, and digital platforms." });

  return (
    <PageLayout title="Terms of Use" breadcrumb={[{ label: "Terms of Use" }]}>
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
