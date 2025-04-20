// src/types/index.ts
import type { Prisma } from "@/generated/prisma"; // Ensure this path is correct

/**
 * Base Manufacturer type including all scalar fields.
 */
export type Manufacturer = Prisma.ManufacturerGetPayload<{
  // Includes id, manuName, manuCountry, logo, founder, headquarters, subBrands
}>;

/**
 * Base Vehicle type including all scalar fields.
 */
export type Vehicle = Prisma.VehicleGetPayload<{
  // Includes id, modelName, modelYear, manufacturerId, image, productionYears, modelYears, class, bodyStyle
}>;

/**
 * Type for Vehicle data including the related Manufacturer's name.
 * Used for cards or lists where only the manufacturer name is needed alongside vehicle details.
 * NOTE: This now includes all scalar fields from Vehicle due to the base type definition.
 */
export type VehicleWithManufacturerName = Prisma.VehicleGetPayload<{
  include: {
    manufacturer: {
      select: { manuName: true }; // Only select the manufacturer's name
    };
  };
}>;

/**
 * Type for displaying a single Vehicle with its full Manufacturer details.
 * Useful for the individual vehicle page (/vehicles/[id]).
 */
export type VehicleComplete = Prisma.VehicleGetPayload<{
  include: {
    manufacturer: true; // Include all fields from the related manufacturer
  };
}>;

/**
 * Type for Manufacturer data including its related Vehicles (full vehicle details).
 * Useful when you need to display a manufacturer and all its models on the manufacturer's page.
 */
export type ManufacturerWithVehicles = Prisma.ManufacturerGetPayload<{
  include: {
    models: true; // Include all fields from the related vehicles
  };
}>;

/**
 * Type for Manufacturer data including its related Vehicles (only basic vehicle details).
 * Useful if you only need names/years for a list on the manufacturer page.
 */
export type ManufacturerWithBasicVehicles = Prisma.ManufacturerGetPayload<{
  include: {
    models: {
      select: { id: true; modelName: true; modelYear: true }; // Select only basic vehicle fields
    };
  };
}>;

// You can add other shared types here as your application grows.
