// src/app/vehicles/[id]/page.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { AspectRatio } from "@/components/ui/aspect-ratio"; // Keep for fallback
import {
  Car,
  CalendarDays,
  Factory,
  Globe,
  Tag, // Icon for Class/Body Style
  Info, // Icon for Production/Model Years
} from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image"; // Import Next.js Image
import type { VehicleComplete } from "@/types"; // Import the correct type

interface VehiclePageProps {
  params: {
    id: string; // The dynamic segment is always a string initially
  };
}

// Function to fetch a single vehicle by ID (already fetches needed data)
async function getVehicleById(id: number): Promise<VehicleComplete | null> {
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

// Helper component for displaying detail items conditionally
function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | null;
}) {
  if (!value) return null; // Don't render if value is missing
  return (
    <p className="flex items-start sm:items-center">
      <Icon className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-1 sm:mt-0" />
      <span className="font-medium text-foreground mr-2">{label}:</span>
      <span className="text-muted-foreground">{value}</span>
    </p>
  );
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
            {/* Display Actual Image or Placeholder */}
            <AspectRatio ratio={16 / 9} className="bg-muted">
              {vehicle.image ? (
                <Image
                  src={vehicle.image}
                  alt={`Image of ${vehicle.modelName}`}
                  fill // Use fill to cover the AspectRatio container
                  className="object-cover" // Ensure image covers the area
                  priority // Prioritize loading the main image
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Help optimize image loading
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Car className="h-24 w-24 text-gray-400" />{" "}
                  {/* Fallback Icon */}
                </div>
              )}
            </AspectRatio>
            {/* Overlay Title */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <CardTitle className="text-3xl font-bold text-white">
                {vehicle.modelName}
              </CardTitle>
              <CardDescription className="text-lg text-gray-200 mt-1">
                {vehicle.manufacturer.manuName} - {vehicle.modelYear}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Details Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Vehicle Details
              </h2>
              <div className="space-y-3">
                <DetailItem
                  icon={Car}
                  label="Model"
                  value={vehicle.modelName}
                />
                <DetailItem
                  icon={CalendarDays}
                  label="Year"
                  value={vehicle.modelYear}
                />
                <DetailItem icon={Tag} label="Class" value={vehicle.class} />
                <DetailItem
                  icon={Tag}
                  label="Body Style"
                  value={vehicle.bodyStyle}
                />
                <DetailItem
                  icon={Info}
                  label="Production"
                  value={vehicle.productionYears}
                />
                <DetailItem
                  icon={Info}
                  label="Model Years"
                  value={vehicle.modelYears}
                />
              </div>
            </div>

            {/* Manufacturer Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Manufacturer
              </h2>
              <div className="space-y-3">
                <DetailItem
                  icon={Factory}
                  label="Name"
                  value={vehicle.manufacturer.manuName}
                />
                <DetailItem
                  icon={Globe}
                  label="Country"
                  value={vehicle.manufacturer.manuCountry}
                />
                {/* You can add more manufacturer details here if needed */}
                {/* <DetailItem icon={User} label="Founder" value={vehicle.manufacturer.founder} /> */}
                {/* <DetailItem icon={MapPin} label="Headquarters" value={vehicle.manufacturer.headquarters} /> */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

// Optional: Generate Metadata dynamically (already includes relevant info)
export async function generateMetadata({ params }: VehiclePageProps) {
  const vehicleId = parseInt(params.id, 10);
  if (isNaN(vehicleId)) {
    return { title: "Vehicle Not Found" };
  }
  // Fetch only necessary data for metadata
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
    select: {
      modelName: true,
      modelYear: true,
      manufacturer: { select: { manuName: true } },
    },
  });

  if (!vehicle) {
    return { title: "Vehicle Not Found" };
  }

  return {
    title: `${vehicle.modelName} (${vehicle.manufacturer.manuName}) - Car Encyclopedia`,
    description: `Details about the ${vehicle.modelYear} ${vehicle.manufacturer.manuName} ${vehicle.modelName}`,
  };
}
