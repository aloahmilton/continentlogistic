import { useState } from "react";
import { Search, Globe, X, MapPin } from "lucide-react";
import { countries } from "@/utils/countries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CountrySelectorProps {
  currentCountry: string;
  onSelect: (country: string) => void;
  triggerLabel?: string;
}

export default function CountrySelector({ currentCountry, onSelect, triggerLabel }: CountrySelectorProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (name: string) => {
    onSelect(name);
    setOpen(false);
    setSearch("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
          {!triggerLabel && <Globe className="w-4 h-4" />} {triggerLabel || currentCountry}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Globe className="w-6 h-6 brand-red-text" /> 
            Choose Your Location
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Continent Logistic.org operates in over 220 countries and territories. Select your location for local shipping guidance.
          </p>
        </DialogHeader>
        
        <div className="px-6 py-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search country or territory..."
              className="pl-9 h-11"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <ScrollArea className="flex-1 px-6 py-2">
          <div className="grid grid-cols-1 gap-1 py-2">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleSelect(country.name)}
                  className={`flex items-center justify-between px-4 py-3 rounded-md text-sm transition-colors ${
                    currentCountry === country.name
                      ? "bg-primary/10 text-primary font-bold"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg opacity-80">📍</span>
                    {country.name}
                  </span>
                  {currentCountry === country.name && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </button>
              ))
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <p>No countries found matching "{search}"</p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-6 bg-muted/30 border-t flex items-center justify-between text-xs text-muted-foreground">
          <span>{filteredCountries.length} locations available</span>
          <button onClick={() => setOpen(false)} className="hover:text-foreground underline">
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
