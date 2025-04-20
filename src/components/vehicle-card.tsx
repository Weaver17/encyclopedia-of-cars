import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio"; // Using AspectRatio for placeholder
import { Car } from "lucide-react"; // Example icon for placeholder
import Link from "next/link";

// Define the expected structure of the vehicle prop, including the manufacturer
interface VehicleWithManufacturer {
  id: number;
  modelName: string;
  modelYear: string;
  manufacturer: {
    manuName: string;
  };
}

interface VehicleCardProps {
  vehicle: VehicleWithManufacturer;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Link
      href={`/vehicles/${vehicle.id}`}
      className="block hover:shadow-lg transition-shadow duration-200 rounded-lg"
    >
      <Card className="w-full max-w-sm overflow-hidden">
        {" "}
        {/* Added overflow-hidden */}
        <CardHeader className="p-0">
          {" "}
          {/* Remove padding for image */}
          {/* Placeholder Image */}
          <AspectRatio ratio={16 / 9} className="bg-muted">
            {/* You can replace this with an <Image> component later */}
            <div className="flex h-full w-full items-center justify-center">
              <Car className="h-16 w-16 text-gray-400" />{" "}
              {/* Placeholder Icon */}
            </div>
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4">
          {" "}
          {/* Add padding back for content */}
          <CardTitle className="text-lg">{vehicle.modelName}</CardTitle>
          <CardDescription>
            {vehicle.manufacturer.manuName} - {vehicle.modelYear}
          </CardDescription>
        </CardContent>
        {/* Optional Footer - you can add buttons or links here later */}
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
