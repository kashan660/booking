"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Plane, MapPin, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce"; // We might need to create this hook if it doesn't exist

interface Location {
  code: string;
  name: string;
  country_name: string;
  type: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

interface LocationSearchProps {
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
  onSelect: (location: Location) => void;
  className?: string;
  defaultValue?: string;
}

export function LocationSearch({ label, placeholder, icon, onSelect, className, defaultValue }: LocationSearchProps) {
  const [query, setQuery] = useState(defaultValue || "");
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Update query when defaultValue changes (e.g. on page load from URL)
  useEffect(() => {
    if (defaultValue) {
      setQuery(defaultValue);
    }
  }, [defaultValue]);
  
  // Simple debounce implementation inside component to avoid external dependency issues if hook doesn't exist
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/travel/locations?term=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
        setShowDropdown(true);
      } catch (error) {
        console.error("Failed to search locations", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (location: Location) => {
    // Only use the city name to ensure better compatibility with hotel search APIs
    // e.g. "Dubai" instead of "Dubai Airport" or "Dubai (DXB)"
    setQuery(location.name);
    setShowDropdown(false);
    onSelect(location);
  };

  return (
    <div className={`relative ${className}`}>
      <label className="text-sm font-medium mb-2 block">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10">
          {loading ? <Loader2 className="animate-spin h-4 w-4" /> : (icon || <Plane className="h-4 w-4" />)}
        </div>
        <Input 
          className="pl-9" 
          placeholder={placeholder} 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => {
            if (results.length > 0) setShowDropdown(true);
          }}
          onBlur={() => {
            // Delay hiding to allow click
            setTimeout(() => setShowDropdown(false), 200);
          }}
        />
      </div>

      {showDropdown && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {results.map((loc, index) => (
            <div 
              key={`${loc.code}-${index}`}
              className="p-3 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b last:border-0"
              onClick={() => handleSelect(loc)}
            >
              <div>
                <div className="font-medium">{loc.name}</div>
                <div className="text-xs text-muted-foreground">{loc.country_name}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-1.5 py-0.5 bg-slate-100 rounded border font-mono">
                  {loc.code}
                </span>
                {loc.type === 'airport' ? <Plane className="h-3 w-3 text-slate-400" /> : <MapPin className="h-3 w-3 text-slate-400" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
