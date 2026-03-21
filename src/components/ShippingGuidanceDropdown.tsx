import { useState } from "react";
import { Search, Globe, ChevronRight, Hash, Truck } from "lucide-react";
import { countries } from "@/utils/countries";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

export default function ShippingGuidanceDropdown() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 hover:brand-red-text transition-colors font-bold uppercase tracking-tighter text-xs">
          <Globe className="w-3.5 h-3.5" /> Shipping Guidance
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0 bg-white border-border shadow-2xl rounded-2xl overflow-hidden" align="start">
        <div className="brand-yellow-bg p-4">
          <h3 className="text-sm font-black font-serif uppercase tracking-tight flex items-center gap-2">
            <Truck className="w-4 h-4 brand-red-text" /> Country Guides
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Select logic per territory</p>
        </div>
        
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search country..."
              className="pl-9 h-9 text-xs border-none bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <ScrollArea className="h-[350px]">
          <div className="p-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <Link
                  key={country.code}
                  to={`/guides/${country.code.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-muted/50 flex items-center justify-center text-[10px] text-muted-foreground">
                      {country.code}
                    </span>
                    {country.name}
                  </span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
                </Link>
              ))
            ) : (
              <div className="py-8 text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                No results
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-3 bg-muted/20 border-t flex justify-center">
            <Link to="/customer-service" className="text-[9px] font-black uppercase tracking-widest brand-red-text hover:underline">
              Contact Local Agent →
            </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
