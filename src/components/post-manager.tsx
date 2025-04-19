// src/components/PostManager.tsx
"use client"; // This directive marks the component as a Client Component

import React, { useState, useEffect, FormEvent } from "react";

// Define the Post type based on your Prisma schema
interface Post {
  id: number;
  title: string;
  content?: string | null; // Match the optional nature in schema
  createdAt: string; // Dates are often serialized as strings
}

export default function PostManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (e: any) {
        console.error("Failed to fetch posts:", e);
        setError(`Failed to load posts: ${e.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this runs once on mount

  // Handle form submission to create a new post
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setError(null);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const newPost: Post = await response.json();
      setPosts([newPost, ...posts]); // Add new post to the top of the list
      setTitle(""); // Clear form fields
      setContent("");
    } catch (e: any) {
      console.error("Failed to create post:", e);
      setError(`Failed to create post: ${e.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Post Manager</h1>

      {/* Form to Create New Post */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow">
        <h2 className="text-xl mb-2">Create New Post</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-3">
          <label htmlFor="title" className="block mb-1 font-medium">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="block mb-1 font-medium">
            Content (Optional):
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Post
        </button>
      </form>

      {/* Display Posts */}
      <h2 className="text-xl mb-2">Existing Posts</h2>
      {isLoading && <p>Loading posts...</p>}
      {!isLoading && posts.length === 0 && <p>No posts found.</p>}
      {!isLoading && posts.length > 0 && (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded shadow">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              {post.content && (
                <p className="text-gray-700 mt-1">{post.content}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Created: {new Date(post.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
