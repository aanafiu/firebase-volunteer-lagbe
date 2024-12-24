import { useTheme } from "@/components/Provider/theme-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const PostDetails = () => {
  const post = useLoaderData();
  console.log(post);
  const { theme } = useTheme();

  return (
    <Card className="bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16">
      <div className="container mx-auto px-6 lg:px-16 gap-5 flex flex-col md:flex-row items-center">
        {/* Left Side: Image */}
        <div className="w-full">
          <div className=" h-auto rounded-lg shadow-lg">
            <img
              src={post.thumbnail}
              alt={post.postTitle}
              className="w-full h-[300px] rounded-[6px] md:h-[450px] object-fill"
            />
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-black dark:text-gray-100 mb-4">
            {post.postTitle}
          </h1>
          <p className="text-lg text-black dark:text-gray-300 mb-6">
            {post.description}
          </p>
          <div className="space-y-4 text-black dark:text-gray-400">
            <p>
              <span className="font-semibold">Organizer:</span>{" "}
              {post.organizerName}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href={`mailto:${post.organizerEmail}`}
                className="underline hover:text-indigo-300"
              >
                {post.organizerEmail}
              </a>
            </p>
            <p>
              <span className="font-semibold">Category:</span> {post.category}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {post.location}
            </p>
            <p>
              <span className="font-semibold">Volunteers Needed:</span>{" "}
              {post.volunteersNeeded}
            </p>
            <p>
              <span className="font-semibold">Deadline:</span> {post.deadline}
            </p>
          </div>
        </div>
      </div>

      {/* Center Button */}
      <div className="mt-12 text-center">
        <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg">
          Be A Volunteer
        </Button>
      </div>
    </Card>
  );
};

export default PostDetails;
