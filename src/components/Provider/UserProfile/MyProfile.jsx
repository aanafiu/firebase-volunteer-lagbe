import { UserContext } from "@/components/Provider/AuthProvider";
import { Button } from "@/components/ui/button";
import axios from "axios";
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
  useEffect(() => {
    if (user?.email) {
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
        .then((res) => setAllPost(res.data));
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

  //   console.log(allPost, myReqPosts);
  const handleDelete = (id, type) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://backend-volunteer-lagbe.vercel.app/volunteerneededpost/${id}`)
          .then((res) => {
            console.log(`Deleted post with ID: ${id}`);
            if (type === "postedPost") {
              setMyPostedPost((prev) => prev.filter((post) => post._id !== id));
            }
            if (res.status === 200) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
            }
          })
          .catch((err) => {
            console.error("Error deleting post:", err);
          });
        
      }
    });
  };

  return (
    <div>
      <div className=" dark:bg-slate-400 bg-amber-200">
        <div className="container mx-auto flex flex-col gap-5 justify-center items-center h-[400px] ">
          <div>
            <img
              src={user?.photoURL}
              alt=""
              className="w-[100px] h-[100px] rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-indigo-950">
            {" "}
            {user.displayName}
          </h1>
          <div className="mx-auto flex flex-col gap-2 items-center justify-center">
            <h1 className="text-xl font-semibold mx-auto text-blue-950">
              Your History
            </h1>
            <div className="flex gap-5 ">
              <Button onClick={handleToggler} variant={"secondary"}>
                Requested
              </Button>
              <Button onClick={handleToggler} variant={"secondary"}>
                Your Posts
              </Button>
            </div>
          </div>
        </div>
      </div>

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
              <tr className="">
                <th className="p-2 border border-gray-300">#</th>
                <th className="p-2 border border-gray-300">Title</th>
                <th className="p-2 border border-gray-300">Status</th>
                <th className="p-2 border border-gray-300">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {myReqPosts.map((post, index) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="p-2 border border-gray-300">{index + 1}</td>
                  <td className="p-2 border border-gray-300">
                    {post.postTitle}
                  </td>
                  <td className="p-2 border border-gray-300 flex gap-3 items-center justify-start">
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                    <span>
                      <Link
                        to={`/posts/${post._id}`}
                        className="font-bold hover:text-green-500"
                      >
                        View
                      </Link>
                    </span>
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
            <thead>
              <tr>
                <th className="p-2 border border-gray-300">#</th>
                <th className="p-2 border border-gray-300">Title</th>
                <th className="p-2 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myPostedPost.map((post, index) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="p-2 border border-gray-300">{index + 1}</td>
                  <td className="p-2 border border-gray-300">
                    {post.postTitle}
                  </td>
                  <td className="p-2 border border-gray-300">
                    <Link
                      className="text-blue-500 hover:underline mr-2"
                      to={`/user/updatepost/${post._id}`}
                    >
                      Update
                    </Link>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(post._id, "postedPost")}
                    >
                      Delete
                    </button>
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

export default MyProfile;
