// src/app/search/page.tsx
import SearchVehicles from "@/components/search-vehicles"; // Import the client component

export default function SearchPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Search Vehicles</h1>

      <SearchVehicles />
    </main>
  );
}

// Optional: Add Metadata for the page
export async function generateMetadata() {
  return {
    title: "Search - Car Encyclopedia",
    description: "Search for car models and makes.",
  };
}
