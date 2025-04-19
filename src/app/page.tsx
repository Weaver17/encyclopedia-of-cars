// src/app/page.tsx

import PostManager from "@/components/post-manager";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* You can add other page content here */}
      <div className="w-full max-w-4xl">
        {" "}
        {/* Constrain width */}
        <PostManager />
      </div>
      {/* You can add other page content here */}
    </main>
  );
}
