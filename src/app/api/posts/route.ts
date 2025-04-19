// src/app/api/posts/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Import the shared instance

// Handler for GET requests to fetch all posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc", // Order by creation date descending
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// Handler for POST requests to create a new post
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { title, content } = body;

    // Basic validation
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content, // Content is optional based on schema
      },
    });
    return NextResponse.json(newPost, { status: 201 }); // 201 Created status
  } catch (error) {
    console.error("Failed awdAWDA to create post:", error);
    return NextResponse.json(
      { error: "Failed to ADfAEFAEF create post" },
      { status: 500 }
    );
  }
}
