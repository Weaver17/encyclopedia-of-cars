// src/components/vehicle-list.tsx
"use client"; // Mark this as a Client Component

import React, { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VehicleCard from "@/components/vehicle-card";
import type { VehicleWithManufacturerName } from "@/types";

type SortOption = "year_desc" | "make_asc" | "model_asc";

interface VehicleListProps {
  initialVehicles: VehicleWithManufacturerName[];
}

export default function VehicleList({ initialVehicles }: VehicleListProps) {
  const [sortBy, setSortBy] = useState<SortOption>("year_desc"); // Default sort

  const sortedVehicles = useMemo(() => {
    const vehiclesCopy = [...initialVehicles]; // Create a copy to avoid mutating the prop

    switch (sortBy) {
      case "make_asc":
        return vehiclesCopy.sort(
          (a, b) =>
            a.manufacturer.manuName.localeCompare(b.manufacturer.manuName) ||
            a.modelName.localeCompare(b.modelName) // Secondary sort by model
        );
      case "model_asc":
        return vehiclesCopy.sort(
          (a, b) =>
            a.modelName.localeCompare(b.modelName) ||
            a.manufacturer.manuName.localeCompare(b.manufacturer.manuName) // Secondary sort by make
        );
      case "year_desc":
      default:
        // Assuming modelYear is a string like "2023". Convert to number for proper sorting.
        return vehiclesCopy.sort((a, b) => {
          const yearA = parseInt(a.modelYear, 10);
          const yearB = parseInt(b.modelYear, 10);
          // Handle potential NaN if modelYear isn't purely numeric
          if (isNaN(yearB) || yearA > yearB) return -1;
          if (isNaN(yearA) || yearA < yearB) return 1;
          // Secondary sort if years are equal
          return (
            a.manufacturer.manuName.localeCompare(b.manufacturer.manuName) ||
            a.modelName.localeCompare(b.modelName)
          );
        });
    }
  }, [initialVehicles, sortBy]);

  return (
    <div>
      {/* Sorting Controls */}
      <div className="mb-6 flex justify-end">
        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as SortOption)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="year_desc">Year (Newest First)</SelectItem>
            <SelectItem value="make_asc">Make (A-Z)</SelectItem>
            <SelectItem value="model_asc">Model (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Vehicle Grid */}
      {sortedVehicles.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No vehicles found in the database.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  );
}
