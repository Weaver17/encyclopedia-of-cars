// src/app/manufacturers/[id]/page.tsx
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Factory, Globe, Car, CalendarDays } from "lucide-react"; // Import necessary icons
import type { ManufacturerWithVehicles } from "@/types"; // Import the specific type

// Define the props type, including the dynamic 'id' parameter
interface ManufacturerPageProps {
  params: {
    id: string; // The dynamic segment is always a string initially
  };
}

// Function to fetch a single manufacturer and its vehicles by ID
async function getManufacturerWithVehicles(
  id: number
): Promise<ManufacturerWithVehicles | null> {
  try {
    const manufacturer = await prisma.manufacturer.findUnique({
      where: { id: id },
      include: {
        models: {
          // Include related vehicles
          orderBy: {
            // Optional: Order vehicles by year or name
            modelYear: "desc",
          },
        },
      },
    });
    return manufacturer;
  } catch (error) {
    console.error("Failed to fetch manufacturer:", error);
    return null; // Return null on error
  }
}

// The Page component itself (Server Component)
export default async function ManufacturerPage({
  params,
}: ManufacturerPageProps) {
  // Validate and parse the ID
  const manufacturerId = parseInt(params.id, 10);
  if (isNaN(manufacturerId)) {
    notFound(); // Show 404 if ID is not a valid number
  }

  const manufacturer = await getManufacturerWithVehicles(manufacturerId);

  // Handle manufacturer not found
  if (!manufacturer) {
    notFound(); // Trigger the Next.js 404 page
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Optional: Breadcrumbs */}
        {/* <Link href="/manufacturers" className="text-sm text-muted-foreground hover:underline mb-4 inline-block">&larr; Back to Manufacturers</Link> */}

        {/* Manufacturer Info Card */}
        <Card className="mb-8 overflow-hidden">
          <CardHeader className="flex flex-col md:flex-row items-start gap-6 p-6">
            {/* Placeholder Logo */}
            <div className="w-full md:w-1/4 lg:w-1/5 flex-shrink-0">
              <AspectRatio ratio={1 / 1} className="bg-muted rounded-md">
                <div className="flex h-full w-full items-center justify-center">
                  <Factory className="h-20 w-20 text-gray-400" />
                </div>
              </AspectRatio>
            </div>
            {/* Info */}
            <div className="flex-grow">
              <CardTitle className="text-3xl font-bold mb-2">
                {manufacturer.manuName}
              </CardTitle>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center text-lg">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  {manufacturer.manuCountry}
                </p>
                {/* Add more manufacturer details here if needed */}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Vehicle Models List */}
        <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
          Models ({manufacturer.models.length})
        </h2>
        {manufacturer.models.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No models found for this manufacturer.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manufacturer.models.map((vehicle) => (
              // Simple Card for each model
              <Link
                key={vehicle.id}
                href={`/vehicles/${vehicle.id}`}
                className="block"
              >
                <Card className="hover:shadow-md transition-shadow duration-150 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {vehicle.modelName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2" />{" "}
                    {vehicle.modelYear}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// Optional: Generate Metadata dynamically
export async function generateMetadata({ params }: ManufacturerPageProps) {
  const manufacturerId = parseInt(params.id, 10);
  if (isNaN(manufacturerId)) {
    return { title: "Manufacturer Not Found" };
  }
  // Fetch only necessary data for metadata
  const manufacturer = await prisma.manufacturer.findUnique({
    where: { id: manufacturerId },
    select: { manuName: true }, // Only select name for metadata
  });

  if (!manufacturer) {
    return { title: "Manufacturer Not Found" };
  }

  return {
    title: `${manufacturer.manuName} - Car Encyclopedia`,
    description: `Browse models from ${manufacturer.manuName}.`,
  };
}
