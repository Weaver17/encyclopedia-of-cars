import { Manufacturer } from "@/types";
import prisma from "@/lib/prisma";
import ManufacturerCard from "@/components/manu-card";

// Function to fetch all manufacturers
async function getManufacturers() {
  try {
    const manufacturers = await prisma.manufacturer.findMany({
      orderBy: {
        manuName: "asc", // Order alphabetically by name
      },
    });
    return manufacturers;
  } catch (error) {
    console.error("Failed to fetch manufacturers:", error);
    return []; // Return empty array on error
  }
}

// The Page component (Server Component)
export default async function ManufacturersPage() {
  const manufacturers: Manufacturer[] = await getManufacturers();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">All Manufacturers</h1>

      {manufacturers.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No manufacturers found in the database.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {manufacturers.map((manufacturer) => (
            <ManufacturerCard
              key={manufacturer.id}
              manufacturer={manufacturer}
            />
          ))}
        </div>
      )}
    </main>
  );
}

// Optional: Add Metadata for the page
export async function generateMetadata() {
  return {
    title: "Manufacturers - Car Encyclopedia",
    description: "Browse car manufacturers.",
  };
}
