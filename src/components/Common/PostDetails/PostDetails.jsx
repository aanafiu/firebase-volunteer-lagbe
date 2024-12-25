import { UserContext } from "@/components/Provider/AuthProvider";
import { useTheme } from "@/components/Provider/theme-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const PostDetails = () => {
    const {user} = useContext(UserContext);
  const post = useLoaderData();
  console.log(post);
  const { theme } = useTheme();


//   Status Check
const [userStatus, setUserStatus] = useState("")
useEffect(()=>{
    axios.get(`https://backend-volunteer-lagbe.vercel.app/userinformation?email=${user?.email}`)
      .then((res)=>{
        console.log(res.data.requestedVolunteer)
        const requestedData = res.data.requestedVolunteer;
        const status = requestedData?.find((r) => r.id === post._id)?.status;
        if (status === "requested") {
            setUserStatus(status);
          } else {
            setUserStatus('Not requested'); // Default if no match
          }
      })
},[user?.email, post])

const navigate = useNavigate();
//   Be A Volunteer Modal
const handleBeVolunteer = (e)=>{
    Swal.fire({
        html: `
          <div class="w-full flex justify-center items-center mx-auto flex-col text-black">
            <img src=${post.thumbnail} class="w-[100px] h-[100px] rounded-full"/>
            <h1>Title: ${post.postTitle}</h1>
            <h1>Location: ${post.location}</h1>
            <h1>Number Of Volunteer Needs: ${post.volunteersNeeded}</h1>
            <h1>Deadline: ${post.deadline}</h1>
            <div>
              <h1 class='${userStatus ==="requested" ? "text-green-500" : "text-red-500"}'>Status: ${userStatus.toUpperCase()}</h1>
            </div>
          </div>
        `,
        confirmButtonText: "Request",
        footer: `
          <button id="closeButton" class="swal2-close-button bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
            Close
          </button>
        `,
        willOpen: () => {
          const confirmButton = Swal.getConfirmButton();
          if (userStatus === "requested") {
            confirmButton.disabled = true; // Disable the button if status is "Requested"
          }
          // Add a click event to the close button
          document.getElementById("closeButton").addEventListener("click", () => {
            Swal.close();
          });
        },
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      })      
      .then((result)=>{
        if(result.isConfirmed)
        {
            const updatedData = {
                requestedVolunteer :post._id,
                status:"requested"

            };
            console.log(updatedData)

            fetch(`https://backend-volunteer-lagbe.vercel.app/userinformation?email=${user?.email}`, {
                method: 'PATCH',
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(updatedData),
              })
              

            //   Now Descrese the total vlunteer number
            const data =  post.volunteersNeeded;
            console.log(parseInt(data)); 
            axios.patch(`https://backend-volunteer-lagbe.vercel.app/volunteerneededpost/${post._id}`,data)
            .then(response =>{
                if(response.status === 200)
                {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "right-bottom",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "success",
                        title: "Requested As A Volunteer"
                      });
                }
            })
            navigate("/user/myprofile")  
        }
      })
}

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
            <h1 className={`${userStatus ==="requested" ? "text-green-500" : "text-red-500"}`}>Status: {userStatus.toUpperCase()}</h1>
          </div>
        </div>
      </div>

      {/* Center Button */}
      <div className="mt-12 text-center">
        <Button onClick={handleBeVolunteer} className="bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg">
          {userStatus === "requested" ? "Check Request" : "Be A Volunteer" }
        </Button>
      </div>
    </Card>
  );
};

export default PostDetails;
