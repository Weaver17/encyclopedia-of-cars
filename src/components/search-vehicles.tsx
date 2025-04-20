// src/components/search-vehicles.tsx
"use client";

import React, { useState, useTransition, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import VehicleCard from "@/components/vehicle-card";
import { searchVehiclesAction } from "@/app/search/actions"; // Import the Server Action
import type { VehicleComplete } from "@/types";
import { useDebouncedCallback } from "use-debounce";

export default function SearchVehicles() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<VehicleComplete[]>([]);
  const [isSearching, startTransition] = useTransition(); // For pending state

  // Debounced function to call the server action
  const debouncedSearch = useDebouncedCallback((searchTerm: string) => {
    startTransition(async () => {
      const searchResults = await searchVehiclesAction(searchTerm);
      const transformedResults = searchResults.map((vehicle) => ({
        ...vehicle,
        manufacturer: {
          id: 0, // Replace with actual data if available
          manuName: vehicle.manufacturer.manuName,
          manuCountry: "", // Replace with actual data if available
          logo: null, // Replace with actual data if available
          founder: null, // Replace with actual data if available
          headquarters: null, // Replace with actual data if available
          subBrands: [], // Replace with actual data if available
        },
      }));
      setResults(transformedResults);
    });
  }, 500); // Debounce for 500ms

  // Effect to trigger search when query changes (after debounce)
  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Optional: Handle form submission if you prefer explicit search button clicks
  // const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   startTransition(async () => {
  //     const searchResults = await searchVehiclesAction(query);
  //     setResults(searchResults);
  //   });
  // };

  return (
    <div>
      {/* Search Form */}
      <form
        // onSubmit={handleSearchSubmit} // Uncomment if using explicit submit
        className="flex items-center gap-2 mb-8 max-w-lg mx-auto"
      >
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search model or make..."
            value={query}
            onChange={handleInputChange}
            className="w-full pl-10" // Add padding for icon
          />
        </div>
        {/* Optional Submit Button */}
        <Button type="submit" disabled={isSearching}>
          {isSearching ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          Search
        </Button>
      </form>

      {/* Results Area */}
      <div>
        {isSearching && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="ml-3 text-muted-foreground">Searching...</p>
          </div>
        )}

        {!isSearching && query && results.length === 0 && (
          <p className="text-center text-muted-foreground py-10">
            No vehicles found matching "{query}".
          </p>
        )}

        {!isSearching && results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}

        {!isSearching && !query && (
          <p className="text-center text-muted-foreground py-10">
            Enter a model or make to start searching.
          </p>
        )}
      </div>
    </div>
  );
}
