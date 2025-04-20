import VehicleCard from "@/components/vehicle-card";
import { VehicleWithManufacturerName } from "@/types";
import prisma from "@/lib/prisma";

async function getVehicles() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: {
        manufacturer: {
          // Include the related manufacturer data
          select: {
            // Only select the fields you need from manufacturer
            manuName: true,
          },
        },
      },
      orderBy: [
        // Optional: Order the results
        { manufacturer: { manuName: "asc" } },
        { modelName: "asc" },
      ],
    });
    return vehicles;
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    // In a real app, you might want to throw the error or return an empty array
    // to be handled by the component rendering logic.
    return [];
  }
}

export default async function HomePage() {
  const vehicles = await getVehicles();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        All Vehicle Models
      </h1>

      {vehicles.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No vehicles found in the database.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle: VehicleWithManufacturerName) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </main>
  );
}
