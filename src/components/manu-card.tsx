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
import Image from "next/image";

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
      <Card className="w-full h-full gap-2 overflow-hidden">
        <CardHeader className="p-0">
          {/* Placeholder Logo */}
          <AspectRatio ratio={16 / 9} className="p-2 object-contain">
            <Image
              className="p-2 w-full h-full object-contain"
              src={manufacturer.logo ?? ""}
              alt={manufacturer.manuName}
              fill
              priority
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 text-center">
          {" "}
          {/* Centered text */}
          <CardTitle className="text-lg mb-2">
            {manufacturer.manuName}
          </CardTitle>
          {/* You could add manuCountry here if desired */}
          <CardDescription>{manufacturer.manuCountry}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
