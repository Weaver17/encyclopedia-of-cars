import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Car, CalendarDays, Factory, Globe } from "lucide-react";
import { notFound } from "next/navigation";

interface VehiclePageProps {
  params: {
    id: string; // The dynamic segment is always a string initially
  };
}

// Function to fetch a single vehicle by ID
async function getVehicleById(id: number) {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: id },
      include: {
        manufacturer: true, // Include all manufacturer details
      },
    });
    return vehicle;
  } catch (error) {
    console.error("Failed to fetch vehicle:", error);
    return null; // Return null on error
  }
}

// The Page component itself (Server Component)
export default async function VehiclePage({ params }: VehiclePageProps) {
  // Validate and parse the ID
  const vehicleId = parseInt(params.id, 10);
  if (isNaN(vehicleId)) {
    notFound(); // Show 404 if ID is not a valid number
  }

  const vehicle = await getVehicleById(vehicleId);

  // Handle vehicle not found
  if (!vehicle) {
    notFound(); // Trigger the Next.js 404 page
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Optional: Breadcrumbs or back link */}
        {/* <Link href="/vehicles" className="text-sm text-muted-foreground hover:underline mb-4 inline-block">&larr; Back to Models</Link> */}

        <Card className="overflow-hidden">
          <CardHeader className="p-0 relative">
            {/* Placeholder Image */}
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <div className="flex h-full w-full items-center justify-center">
                <Car className="h-24 w-24 text-gray-400" />
              </div>
            </AspectRatio>
            {/* Overlay Title */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
              <CardTitle className="text-3xl font-bold text-white">
                {vehicle.modelName}
              </CardTitle>
              <CardDescription className="text-lg text-gray-200 mt-1">
                {vehicle.manufacturer.manuName} - {vehicle.modelYear}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Details Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Details
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="flex items-center">
                  <Car className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium text-foreground mr-2">
                    Model:
                  </span>{" "}
                  {vehicle.modelName}
                </p>
                <p className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium text-foreground mr-2">
                    Year:
                  </span>{" "}
                  {vehicle.modelYear}
                </p>
              </div>
            </div>

            {/* Manufacturer Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Manufacturer
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="flex items-center">
                  <Factory className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium text-foreground mr-2">
                    Name:
                  </span>{" "}
                  {vehicle.manufacturer.manuName}
                </p>
                <p className="flex items-center">
                  <Globe className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium text-foreground mr-2">
                    Country:
                  </span>{" "}
                  {vehicle.manufacturer.manuCountry}
                </p>
              </div>
            </div>

            {/* Add more sections as needed (e.g., specifications, description) */}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

// Optional: Generate Metadata dynamically
export async function generateMetadata({ params }: VehiclePageProps) {
  const vehicleId = parseInt(params.id, 10);
  if (isNaN(vehicleId)) {
    return { title: "Vehicle Not Found" };
  }
  const vehicle = await getVehicleById(vehicleId);

  if (!vehicle) {
    return { title: "Vehicle Not Found" };
  }

  return {
    title: `${vehicle.modelName} (${vehicle.manufacturer.manuName}) - Car Encyclopedia`,
    description: `Details about the ${vehicle.modelYear} ${vehicle.manufacturer.manuName} ${vehicle.modelName}`,
  };
}
