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
import { VehicleComplete } from "@/types";
import Image from "next/image";

interface VehicleCardProps {
  vehicle: VehicleComplete;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Link
      href={`/vehicles/${vehicle.id}`}
      className="block hover:shadow-lg transition-shadow duration-200 rounded-lg"
    >
      <Card className="w-full max-w-sm overflow-hidden ">
        {" "}
        {/* Added overflow-hidden */}
        <CardHeader className="p-0">
          {" "}
          {/* Remove padding for image */}
          {/* Placeholder Image */}
          <AspectRatio ratio={16 / 9} className="bg-muted">
            {/* You can replace this with an <Image> component later */}
            <div className="flex h-full w-full items-center justify-center">
              <Image
                src={vehicle.image ?? ""}
                alt={vehicle.modelName}
                width={400}
                height={225}
              />
            </div>
          </AspectRatio>
        </CardHeader>
        <CardContent className="px-4 py-1">
          {" "}
          {/* Add padding back for content */}
          <CardTitle className="text-lg">{vehicle.modelName}</CardTitle>
          <CardDescription>
            {vehicle.manufacturer.manuName} - {vehicle.modelYear}
          </CardDescription>
        </CardContent>
        {/* Optional Footer - you can add buttons or links here later */}
        <CardFooter className="flex text-xs pb-6 text-muted-foreground border-t border-muted-foreground items-center justify-between">
          <p>{vehicle.class}</p>
          <p>{vehicle.bodyStyle}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
