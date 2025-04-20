// src/app/search/actions.ts
"use server"; // Mark this module as containing Server Actions

import prisma from "@/lib/prisma";
import type { VehicleWithManufacturerName } from "@/types";

export async function searchVehiclesAction(
  query: string
): Promise<VehicleWithManufacturerName[]> {
  if (!query || query.trim() === "") {
    return []; // Return empty if query is empty
  }

  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        OR: [
          {
            modelName: {
              contains: query,
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            manufacturer: {
              manuName: {
                contains: query,
                mode: "insensitive", // Case-insensitive search
              },
            },
          },
        ],
      },
      include: {
        manufacturer: {
          select: {
            manuName: true,
          },
        },
      },
      orderBy: [
        // Optional: Order results
        { manufacturer: { manuName: "asc" } },
        { modelName: "asc" },
      ],
      take: 50, // Optional: Limit the number of results
    });
    return vehicles;
  } catch (error) {
    console.error("Search failed:", error);
    // In a real app, you might want more robust error handling
    // or return an error object to the client.
    return [];
  }
}
