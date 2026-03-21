import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Globe, 
  ChevronRight,
  Info,
  Truck,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { countries } from "@/utils/countries";

const specificGuides: Record<string, any> = {
  "us": {
    name: "United States",
    flag: "🇺🇸",
    overview: "Shipping to the United States requires strict adherence to CBP (Customs and Border Protection) regulations. Electronic Export Information (EEI) may be required for shipments over $2,500.",
    prohibited: ["Counterfeit goods", "Certain fruits and vegetables", "Endangered species products", "Uncontrolled medications"],
    documentation: ["Commercial Invoice", "Packing List", "Certificate of Origin (for certain goods)", "Toxic Substance Control Act (TSCA) form for chemicals"],
    tips: "Ensure all wood packaging materials (WPM) are heat-treated or fumigated according to ISPM 15 standards."
  },
  "gb": {
    name: "United Kingdom",
    flag: "🇬🇧",
    overview: "Post-Brexit, shipping to the UK from outside the EU (and even from within for certain goods) requires specific customs declarations. An EORI number is essential for businesses.",
    prohibited: ["Offensive weapons", "Indecent or obscene material", "Certain plants and seeds", "Flick knives"],
    documentation: ["Commercial Invoice", "EORI Number", "Commodity Codes", "Customs Declaration (C88/SAD)"],
    tips: "Great Britain (England, Scotland, Wales) and Northern Ireland have different customs protocols for some goods."
  },
  "de": {
    name: "Germany",
    flag: "🇩🇪",
    overview: "Germany has strict environmental and safety regulations. The LUCID Packaging Register registration is required for businesses shipping packaged goods to German end-consumers.",
    prohibited: ["Goods infringing intellectual property", "Certain chemicals", "Unapproved medical products"],
    documentation: ["Commercial Invoice", "EORI Number", "LUCID Registration Info", "Safety Data Sheets (for relevant items)"],
    tips: "Ensure precise descriptions in German or English to avoid clearance delays at Frankfurt or Leipzig hubs."
  },
  "cn": {
    name: "China",
    flag: "🇨🇳",
    overview: "Shipping to China requires a CR (Customs Registration) number for both importers and exporters. The 'Customs Declaration Form for Import/Export Goods' is mandatory.",
    prohibited: ["Political/religious materials deemed harmful", "Used clothing", "Unfired meat", "Certain electronics"],
    documentation: ["Commercial Invoice", "CR Number", "HS Codes (10-digit)", "Certificate of Origin"],
    tips: "Provide descriptions in both English and Chinese for faster clearance."
  },
  "ca": {
    name: "Canada",
    flag: "🇨🇦",
    overview: "Canada's CARM (CBSA Assessment and Revenue Management) portal is essential for commercial importers. Most shipments require a Business Number (BN) from the CRA.",
    prohibited: ["Certain knives", "Hate propaganda", "Second-hand mattresses", "Endangered species products"],
    documentation: ["Canada Customs Invoice (CCI)", "Bill of Lading", "Manifest or Cargo Control Document", "Import Permit (if applicable)"],
    tips: "Ensure the North American Free Trade Agreement (USMCA) documentation is included if applicable for duty relief."
  },
  "ng": {
    name: "Nigeria",
    flag: "🇳🇬",
    overview: "All shipments to Nigeria require a Form 'M' and a SONCAP certificate for regulated products. Pre-shipment inspection (PSI) may also be required for certain categories.",
    prohibited: ["Used motor vehicles over 15 years", "Bagged cement", "Soaps and detergents", "Certain textile fabrics"],
    documentation: ["Form 'M'", "SONCAP or Import Permit", "Commercial Invoice (CCVO or Form C-16)", "Bill of Lading"],
    tips: "Clearance in Lagos (Apapa/Tin Can) can be complex; ensure all paperwork is 100% accurate before the ship arrives."
  },
  "ae": {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    overview: "The UAE (especially Dubai) is a major logistics hub. Custom duties are generally 5% of the CIF value. Arabic translations may be required for certain sensitive documents.",
    prohibited: ["E-cigarettes", "All gambling tools", "Nylon fishing nets", "Pork products"],
    documentation: ["Original Commercial Invoice", "Certificate of Origin", "Bill of Lading", "Packing List"],
    tips: "Free Zones like Jafza have different customs rules than 'onshore' UAE; clarify the final destination with your consignee."
  },
  "au": {
    name: "Australia",
    flag: "🇦🇺",
    overview: "Australia has some of the world's strictest biosecurity laws. All goods must be declared and may be subject to inspection for organic material or pests.",
    prohibited: ["Live animals/plants without permits", "Fresh fruit and vegetables", "Unpackaged food", "Sedge-based items"],
    documentation: ["Commercial Invoice", "Packing List", "Packing Declaration Form", "Treatment Certificates (if applicable)"],
    tips: "Ensure all used machinery is thoroughly cleaned of soil/dirt before shipping to avoid expensive quarantine cleaning fees."
  },
  "fr": {
    name: "France",
    flag: "🇫🇷",
    overview: "Shipping to France within the EU is seamless, but imports from outside require the 'Accompagnement de l'Importation' logic. Intellectual property (Contrefaçon) is strictly monitored.",
    prohibited: ["Counterfeit luxury goods", "Certain medications", "Endangered species items", "Cultural heritage artifacts"],
    documentation: ["Commercial Invoice", "EORI Number", "Transit Document (T1/T2)", "Health Certificate (for food)"],
    tips: "Specify the 'Incoterms' clearly on the invoice to avoid delays at Charles de Gaulle Airport customs."
  },
  "jp": {
    name: "Japan",
    flag: "🇯🇵",
    overview: "Japanese customs are known for their precision. Any discrepancy between the invoice and the actual goods will lead to significant delays and inspections.",
    prohibited: ["Narcotics", "Firearms", "Counterfeit currency", "Goods infringing patents"],
    documentation: ["Commercial Invoice", "Packing List", "Import Declaration Form", "Certificate of Origin (for EPA/FTA rates)"],
    tips: "Include the importer's phone number and a very detailed item description in simple English or Japanese."
  },
  "in": {
    name: "India",
    flag: "🇮🇳",
    overview: "India requires a KYC (Know Your Customer) document for all shipments. Custom duties can be high and vary significantly by HSN (Harmonized System of Nomenclature) code.",
    prohibited: ["Used electronics", "Plastic waste", "Ganja and psychotropic substances", "Pornographic material"],
    documentation: ["Commercial Invoice", "KYC (Aadhar/PAN/Passport)", "Packing List", "Bill of Entry"],
    tips: "Register for the 'ICEGATE' portal if you are a frequent importer to streamline the clearance process."
  },
  "es": {
    name: "Spain",
    flag: "🇪🇸",
    overview: "Shipping to Spain involves the 'Agencia Tributaria' customs protocols. Special attention is needed for shipments to the Canary Islands, Ceuta, and Melilla as they have different tax logic (IGIC/IPSI).",
    prohibited: ["Counterfeit apparel", "Certain rubber products", "Unlicensed medicines", "Offensive weapons"],
    documentation: ["Commercial Invoice", "EORI Number", "Packing List", "T2L Document (for maritime transit)"],
    tips: "Ensure the recipient's NIF/NIE (Tax ID) is clearly stated on the invoice to avoid IVA (VAT) calculation delays."
  },
  "it": {
    name: "Italy",
    flag: "🇮🇹",
    overview: "Italian customs (Agenzia delle Dogane) are strict regarding the valuation of textile and leather goods. 'Made in' labeling must be accurate and verifiable.",
    prohibited: ["Counterfeit designer goods", "Certain plant species", "Un-labeled dietary supplements"],
    documentation: ["Commercial Invoice", "EORI Number", "Phytosanitary Certificate (if applicable)", "Declaration of Value"],
    tips: "Shipments to San Marino or Vatican City are handled through Italian customs but require specific transit markings."
  },
  "br": {
    name: "Brazil",
    flag: "🇧🇷",
    overview: "Brazil is known for 'Custo Brasil' (high complexity). Every shipment must have a CPF (individuals) or CNPJ (businesses) number. Customs (Receita Federal) is extremely thorough.",
    prohibited: ["Used consumer goods", "Refurbished electronics", "Certain chemicals", "Foreign lottery tickets"],
    documentation: ["Pro Forma/Commercial Invoice", "Air Waybill (AWB)", "CPF/CNPJ of the Importer", "Import License (SISCOMEX)"],
    tips: "Never ship without a confirmed CNPJ/CPF; the shipment will be automatically returned or destroyed by Brazilian customs."
  },
  "mx": {
    name: "Mexico",
    flag: "🇲🇽",
    overview: "Shipping to Mexico requires compliance with 'NOM' (Normas Oficiales Mexicanas) standards for product labeling and safety. The 'Pedimento' is the official customs entry document.",
    prohibited: ["Used clothing and shoes", "Certain chemicals", "Bicycles from China (anti-dumping)", "Pencils from certain regions"],
    documentation: ["Commercial Invoice", "RFC (Tax ID) of the Importer", "Packing List", "Certificate of Origin (for USMCA/TMEC)"],
    tips: "Working with a licensed Mexican Customs Broker is highly recommended for commercial shipments over $1,000 USD."
  }
};

const getGuideData = (code: string) => {
  const normalizedCode = code.toLowerCase();
  
  if (specificGuides[normalizedCode]) {
    return specificGuides[normalizedCode];
  }
  
  const country = countries.find(c => c.code.toLowerCase() === normalizedCode);
  const name = country ? country.name : code.toUpperCase();
  
  // Dynamic generation based on country name properties to give unique feel
  const isIsland = name.includes("Islands") || name.includes("Samoa") || name.includes("Fiji") || name.includes("Maldives");
  const isAfrican = ["Benin", "Togo", "Ghana", "Kenya", "Ethiopia", "Uganda", "Rwanda", "Cameroon"].includes(name);
  const isEuropean = ["Italy", "Spain", "Poland", "Belgium", "Austria", "Sweden", "Norway"].includes(name);

  let prohibited = ["Hazardous materials", "Illegal substances", "Counterfeit currency"];
  let documentation = ["Commercial Invoice", "Packing List", "Air Waybill (AWB)"];
  let overview = `Shipping to ${name} involves complex international logistics protocols. All imports are subject to local customs evaluation and tax assessments based on the declared value and HS codes.`;
  let tips = "Ensure your packaging is durable and clearly labeled with the recipient's full contact details to facilitate smooth clearance.";

  if (isIsland) {
    prohibited.push("Soil and organic matter", "Non-indigenous seeds");
    tips = "Sea freight is often more cost-effective for larger shipments, while air express is recommended for urgent documents.";
  } else if (isAfrican) {
    documentation.push("Form 'M' (if applicable)", "Standard Organization Certificate");
    tips = "Expect port-of-entry delays during peak seasons; work closely with our local partners in the region.";
  } else if (isEuropean) {
    documentation.push("EORI Number (for businesses)", "VAT Identification");
    overview = `As a key destination in Europe, ${name} adheres to stringent EU safety and environmental standards. Efficient customs processing is available for documented traders.`;
  }

  return {
    name: name,
    flag: "🌐",
    overview,
    prohibited,
    documentation,
    tips
  };
};

export default function CountryGuide() {
  const { countryCode } = useParams();
  const guide = getGuideData(countryCode || "us");
  const country = countries.find(c => c.code.toLowerCase() === (countryCode || "us").toLowerCase()) || { name: guide.name };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:brand-red-text font-bold uppercase tracking-tighter">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-bold uppercase tracking-tighter">Shipping Guidance</span>
            <ChevronRight className="w-4 h-4" />
            <span className="brand-red-text font-black uppercase tracking-tighter">{country.name}</span>
          </nav>

          <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-xl mb-12">
            <div className="brand-yellow-bg p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{guide.flag}</span>
                    <h1 className="text-4xl md:text-5xl font-black font-serif tracking-tight">
                      Shipping to <span className="brand-red-text">{guide.name}</span>
                    </h1>
                  </div>
                  <p className="text-lg font-medium opacity-90 max-w-2xl">
                    Comprehensive logistics guidance, customs regulations, and essential documentation for your shipments to {guide.name}.
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl border border-white/30 hidden md:block">
                  <Globe className="w-12 h-12 text-foreground/80" />
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-12">
              <section>
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 rounded-full brand-red-bg flex items-center justify-center text-white">
                    <Info className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-black font-serif uppercase tracking-tight">Overview</h2>
                </div>
                <div className="p-6 bg-muted/30 rounded-2xl border border-border">
                  <p className="text-foreground/80 leading-relaxed font-medium">
                    {guide.overview}
                  </p>
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black font-serif uppercase tracking-tight">Prohibited Items</h2>
                  </div>
                  <ul className="space-y-3">
                    {guide.prohibited.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm font-bold text-muted-foreground">
                        <span className="text-amber-500 mt-1">✕</span> {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black font-serif uppercase tracking-tight">Required Docs</h2>
                  </div>
                  <ul className="space-y-3">
                    {guide.documentation.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm font-bold text-muted-foreground">
                        <span className="text-green-600 mt-1">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="bg-foreground text-background p-8 rounded-3xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="w-16 h-16 shrink-0 rounded-2xl brand-yellow-bg flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-widest mb-2 brand-yellow-text">Pro Expert Tip</h3>
                    <p className="text-background/80 font-medium italic">
                      "{guide.tips}"
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              </section>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-white text-center hover:shadow-lg transition-shadow">
              <Truck className="w-8 h-8 mx-auto mb-4 brand-red-text" />
              <h4 className="font-black uppercase tracking-tighter mb-2">Freight Quote</h4>
              <p className="text-xs text-muted-foreground font-bold mb-4">Get competitive rates for {guide.name}.</p>
              <Button variant="outline" className="w-full font-bold uppercase text-[10px] tracking-widest">Get Quote</Button>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-white text-center hover:shadow-lg transition-shadow">
              <Package className="w-8 h-8 mx-auto mb-4 brand-red-text" />
              <h4 className="font-black uppercase tracking-tighter mb-2">Ship Now</h4>
              <p className="text-xs text-muted-foreground font-bold mb-4">Start your shipment to {guide.name}.</p>
              <Button variant="outline" className="w-full font-bold uppercase text-[10px] tracking-widest">Create Label</Button>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-white text-center hover:shadow-lg transition-shadow">
              <FileText className="w-8 h-8 mx-auto mb-4 brand-red-text" />
              <h4 className="font-black uppercase tracking-tighter mb-2">Customs Help</h4>
              <p className="text-xs text-muted-foreground font-bold mb-4">Dedicated customs assistance.</p>
              <Button variant="outline" className="w-full font-bold uppercase text-[10px] tracking-widest">Contact Expert</Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
