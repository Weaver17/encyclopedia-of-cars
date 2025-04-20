// src/components/Header.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Adjust path if your shadcn setup differs
import { Car } from "lucide-react"; // Example icon from lucide-react

export default function Header() {
  return (
    <header className="sticky px-4 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo Section */}
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Car className="h-6 w-6" /> {/* Example Logo Icon */}
            <span className="font-bold inline-block">Car Encyclopedia</span>
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/manufacturers">Manufacturers</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/vehicles">Models</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/search">Search</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
