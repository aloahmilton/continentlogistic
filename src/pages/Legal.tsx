import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

export default function Legal() {
  usePageSEO({ title: "Legal Notice", description: "Continental Track legal notice — company registration, regulatory information, and legal disclaimers." });

  return (
    <PageLayout title="Legal Notice" breadcrumb={[{ label: "Legal Notice" }]}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto prose prose-sm">
          <ScrollReveal>
            <section className="mb-8">
              <h2 className="text-lg font-bold mb-3">Company Information</h2>
              <p className="text-sm text-muted-foreground mb-1">Continental Track International GmbH</p>
              <p className="text-sm text-muted-foreground mb-1">Logistics Avenue 1, 10115 Berlin, Germany</p>
              <p className="text-sm text-muted-foreground mb-1">Registered at: Amtsgericht Berlin-Charlottenburg, HRB 123456</p>
              <p className="text-sm text-muted-foreground">VAT ID: DE123456789</p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold mb-3">Management Board</h2>
              <p className="text-sm text-muted-foreground">The company is represented by its Managing Directors as registered with the commercial register.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold mb-3">Disclaimer</h2>
              <p className="text-sm text-muted-foreground">The content of this website has been compiled with meticulous care and to the best of our knowledge. However, we cannot assume any liability for the up-to-dateness, completeness, or accuracy of any of the pages. External links are provided for convenience only. Continental Track has no influence on the content of linked websites and accepts no responsibility for them.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">Copyright</h2>
              <p className="text-sm text-muted-foreground">All content on this website, including text, images, graphics, and logos, is the property of Continental Track and is protected by copyright law. Reproduction or distribution requires prior written consent.</p>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
