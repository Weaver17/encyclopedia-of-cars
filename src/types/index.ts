import { Prisma } from "@/generated/prisma";

export type Manufacturer = Prisma.ManufacturerGetPayload<{
  // You can add include or select here if needed
  // include: { models: true }
}>;

/**
 * Type for Vehicle data including the related Manufacturer's name.
 * Useful for displaying vehicle details with its manufacturer.
 */
export type VehicleWithManufacturerName = Prisma.VehicleGetPayload<{
  include: {
    manufacturer: {
      select: { manuName: true };
    };
  };
}>;

/**
 * Type for Manufacturer data including its related Vehicles.
 * Useful when you need to display a manufacturer and all its models.
 */
export type ManufacturerWithVehicles = Prisma.ManufacturerGetPayload<{
  include: {
    models: true; // Include all fields from the related vehicles
    // Or select specific vehicle fields:
    // models: { select: { id: true, modelName: true, modelYear: true } }
  };
}>;
