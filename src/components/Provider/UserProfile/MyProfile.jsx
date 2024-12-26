import Loader from "@/components/Common/Loader";
import { UserContext } from "@/components/Provider/AuthProvider";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ClipboardPenLine, Trash2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user } = useContext(UserContext);
  const [buttonToggle, setButtonToggle] = useState(true);
  const handleToggler = () => {
    setButtonToggle(!buttonToggle);
  };
  const [data, setData] = useState({});
  const [allPost, setAllPost] = useState({});
  
  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true); // Set loading to true when starting to fetch data
      axios
        .get(`https://backend-volunteer-lagbe.vercel.app/userinformation?email=${user?.email}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
      axios
        .get("https://backend-volunteer-lagbe.vercel.app/volunteerneededpost")
        .then((res) => {
          setAllPost(res.data);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after data has been fetched
        });
    }
  }, [user?.email]);

  const [myReqPosts, setMyReqPosts] = useState([]);

  useEffect(() => {
    if (data?.requestedVolunteer && allPost.length > 0) {
      // Filter posts based on requestedVolunteer IDs
      const myReq = allPost.filter((post) =>
        data.requestedVolunteer.some((req) => req.id === post._id)
      );
      setMyReqPosts(myReq);
    }
  }, [data, allPost]);
  
  const [myPostedPost, setMyPostedPost] = useState([]);
  useEffect(() => {
    if (allPost.length > 0 && user?.email) {
      const myReq = allPost.filter(
        (post) => post.organizerEmail === user?.email
      );
      console.log("Filtered Posts:", myReq); // Debug log
      setMyPostedPost(myReq);
    }
  }, [allPost, user?.email]);

  if(loading)
  {
    return <Loader></Loader>
  }

  return (
    <div>
      <div className=" dark:bg-green-400 bg-blue-950">
        <div className="container mx-auto flex flex-col gap-5 justify-center items-center h-[400px] ">
          <div>
            <img
              src={user?.photoURL}
              alt=""
              className="w-[100px] h-[100px] rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-green-500 dark:text-blue-950">
            {user.displayName}
          </h1>
          <div className="mx-auto flex flex-col gap-2 items-center justify-center">
            <h1 className="text-xl font-semibold mx-auto text-green-500 dark:text-blue-950">
              Your History
            </h1>
            <div className="flex gap-5 ">
              <Button onClick={handleToggler} variant="destructive">
                Requested
              </Button>
              <Button onClick={handleToggler} variant="destructive">
                Your Posts
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Show loading state */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader></Loader>
        </div>
    
      ) : (
        <div>
          {/* Dynamic Section */}
          {buttonToggle ? (
            <div className="container mx-auto my-10">
              {" "}
              {/* Requested Posts Table */}
              <h2 className="text-2xl font-bold mb-2 mx-auto w-fit">
                Requested Posts
              </h2>
              <table className="w-full border-collapse border border-gray-300 text-left mb-4">
                <thead>
                  <tr  data-aos="zoom-in-up" className="">
                    <th className="p-2 border border-gray-300">#</th>
                    <th className="p-2 border border-gray-300">Title</th>
                    <th className="p-2 border border-gray-300">Status</th>
                    <th className="p-2 border border-gray-300">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {myReqPosts.map((post, index) => (
                    <tr  data-aos="zoom-in-up" key={post.id} className=" hover:bg-gray-50 dark:hover:text-green-500">
                      <td className="p-2 border border-gray-300">{index + 1}</td>
                      <td className="p-2 border border-gray-300">
                        {post.postTitle}
                      </td>
                      <td className="p-2 border border-gray-300 h-full">
                        <Link
                          to={`/posts/${post._id}`}
                          className="font-bold h-full flex justify-center items-center gap-3 hover:text-green-500"
                        >
                          <div className=" w-3 h-3 bg-green-500 rounded-full"></div>
                          View
                        </Link>
                      </td>
                      <td className="p-2 border border-gray-300">
                        {post.deadline}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="container mx-auto my-10">
              <h2 className="text-2xl font-bold mb-2 w-fit mx-auto">
                My Posted Posts
              </h2>
              <table className="w-full border-collapse border border-gray-300 text-left">
                <thead >
                  <tr  data-aos="zoom-in-up" >
                    <th className="p-2 border border-gray-300">#</th>
                    <th className="p-2 border border-gray-300">Title</th>
                    <th className="p-2 border border-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myPostedPost.map((post, index) => (
                    <tr  data-aos="zoom-in-up" key={post._id} className="hover:bg-gray-50 dark:hover:text-green-500">
                      <td className="p-2 border border-gray-300">{index + 1}</td>
                      <td className="p-2 border border-gray-300">
                        {post.postTitle}
                      </td>
                      <td className="p-2 border flex justify-center items-center w-full border-gray-300">
                        <Link
                          className="text-blue-500 hover:underline mr-2"
                          to={`/user/updatepost/${post._id}`}
                        >
                          <ClipboardPenLine size={24} strokeWidth={1.75} />
                        </Link>
                        <button
                          className="hover:underline bg-transparent"
                          onClick={() => handleDelete(post._id, "postedPost")}
                        >
                          <Trash2 size={24} color="#ff0000" strokeWidth={1.75} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
