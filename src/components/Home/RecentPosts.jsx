import Loader from "@/components/Common/Loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const RecentPosts = () => {
  const [data, setData] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(6); // Controls how many posts are shown
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    axios
      .get("https://backend-volunteer-lagbe.vercel.app/volunteerneededpost")
      .then((res) => {
        setData(res.data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div  className="my-[100px] container mx-auto">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold w-fit mx-auto text-blue-950 dark:text-blue-600">
        Volunteer{" "}
        <span className="text-green-600 dark:text-green-500">
          <Typewriter
            words={["Need", "Or", "Post"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {loading ? (
          <div className="col-span-full text-center">
            <Loader></Loader>
          </div>
        ) : (
          data.slice(0, visiblePosts).map((post, index) => (
            <Card data-aos="flip-down"
              key={post._id || index}
              className="p-4 shadow-lg rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-bold text-blue-950 dark:text-white mb-2">
                {post.postTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Organizer:</strong> {post.organizerName}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Deadline:</strong> {post.deadline}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-3">
                {post.description.length > 100
                  ? post.description.slice(0, 100) + "..."
                  : post.description}
              </p>
            </Card>
          ))
        )}
      </div>

      <div data-aos="flip-down" className="text-center mt-8">
        <Link to="/all-needed-posts">
          <Button
            variant={"link"}
            className="text-lg px-4 py-3 font-bold hover:px-6"
          >
            Show More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecentPosts;
