import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/ScrollReveal";
import usePageSEO from "@/hooks/usePageSEO";

export default function FindServicePoint() {
  usePageSEO({ title: "Find a Service Point", description: "Find your nearest Continent Logistic.org service point, drop-off location, or locker. Search by city, ZIP code, or address." });
  const [query, setQuery] = useState("");

  return (
    <PageLayout title="Find a Service Point" breadcrumb={[{ label: "Find a Service Point" }]} heroSubtitle="Locate your nearest Continent Logistic.org service point, drop-off location, or parcel locker.">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="flex gap-0 mb-8">
              <input type="text" placeholder="Enter city, ZIP code, or address" value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 px-4 py-3 text-sm border border-r-0 border-border rounded-l focus:outline-none focus:ring-2 focus:ring-ring" />
              <button className="px-6 py-3 brand-red-bg text-primary-foreground text-sm font-semibold rounded-r hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center gap-2">
                <Search className="w-4 h-4" /> Search
              </button>
            </div>

            {/* Placeholder map area */}
            <div className="bg-muted rounded-lg h-80 flex items-center justify-center border border-border">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">Enter a location to find nearby service points</p>
                <p className="text-xs mt-1">We have 50,000+ service points worldwide</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageLayout>
  );
}
