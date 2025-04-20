// src/app/vehicles/page.tsx
import prisma from "@/lib/prisma";
import VehicleList from "@/components/vehicle-list"; // Import the new Client Component
import type { VehicleWithManufacturerName } from "@/types";

// Function to fetch all vehicles (initial sort doesn't strictly matter here anymore,
// but keeping it might be slightly better for initial paint)
async function getVehicles() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: {
        manufacturer: {
          select: {
            manuName: true,
          },
        },
      },
      // You can keep the initial sort or remove it, as client-side will handle it
      orderBy: [
        { modelYear: "desc" },
        { manufacturer: { manuName: "asc" } },
        { modelName: "asc" },
      ],
    });
    return vehicles;
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    return [];
  }
}

// The Page component remains a Server Component
export default async function VehiclesPage() {
  // Fetch initial data on the server
  const initialVehicles: VehicleWithManufacturerName[] = await getVehicles();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        All Vehicle Models
      </h1>

      {/* Render the Client Component, passing the fetched data */}
      <VehicleList initialVehicles={initialVehicles} />
    </main>
  );
}

// Optional: Add Metadata for the page
export async function generateMetadata() {
  return {
    title: "All Models - Car Encyclopedia",
    description: "Browse all car models.", // Description updated slightly
  };
}
