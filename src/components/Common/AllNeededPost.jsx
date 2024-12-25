import PostCard from "@/components/Common/PostCard";
import { Button } from "@/components/ui/button";
import { Grid3x3, Rows3, SquareEqual } from "lucide-react";
import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const AllNeededPost = () => {
  const posts = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'row'

  // Function to filter posts based on the search query
  const filteredPosts = posts.filter((post) =>
    post.postTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto my-10">
      <div className="mb-4 flex flex-row-reverse justify-between items-center">
        <Button>
          <Link to="/user/myposts">Need Volunteer</Link>
        </Button>

        <div className="flex gap-2 items-center justify-center">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          {/* Layout Toggle Buttons */}
          <div className="flex justify-center gap-5 items-center">
            View Style
            <Button className="m-0 p-0"
              variant={viewMode === "card" ? "secondary" : "primary"}
              onClick={() => setViewMode("card")}
            >
              <Grid3x3 className="p-0 m-0" />
            </Button>
            <Button className="m-0 p-0"
              variant={viewMode === "row" ? "secondary" : "primary"}
              onClick={() => setViewMode("row")}
            >
              <Rows3 size={48} strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </div>

      {/* Post Display */}
      {viewMode === "card" ? (
        <div
          className={`grid gap-4 ${
            viewMode === "card"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      ) : (
        <div className="mt-5">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Thumbnail</th>
                <th className="px-4 py-2 text-left">Post Title</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post._id} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={post.thumbnail}
                      alt="Thumbnail"
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{post.postTitle}</td>
                  <td className="px-4 py-2">{post.location}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/posts/${post._id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllNeededPost;
