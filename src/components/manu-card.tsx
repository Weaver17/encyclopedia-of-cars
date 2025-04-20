// src/components/manufacturer-card.tsx
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Factory } from "lucide-react"; // Icon for placeholder logo
import { Manufacturer } from "@/types";

interface ManufacturerCardProps {
  manufacturer: Manufacturer; // Use the base type from Prisma
}

export default function ManufacturerCard({
  manufacturer,
}: ManufacturerCardProps) {
  return (
    // Optional: Link to a future individual manufacturer page
    <Link
      href={`/manufacturers/${manufacturer.id}`}
      className="block hover:shadow-lg transition-shadow duration-200 rounded-lg"
    >
      <Card className="w-full h-full overflow-hidden">
        <CardHeader className="p-0">
          {/* Placeholder Logo */}
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <div className="flex h-full w-full items-center justify-center">
              <Factory className="h-16 w-16 text-gray-400" />{" "}
              {/* Placeholder Icon */}
            </div>
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 text-center">
          {" "}
          {/* Centered text */}
          <CardTitle className="text-lg">{manufacturer.manuName}</CardTitle>
          {/* You could add manuCountry here if desired */}
          <CardDescription>{manufacturer.manuCountry}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
