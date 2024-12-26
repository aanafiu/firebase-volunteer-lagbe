import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserContext } from "@/components/Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";

const MyVolunteerPostUpdate = () => {
    const postID = useParams();
    console.log(postID);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [toggleImage, setToggleImage] = useState(false);

  const form = useForm({
    defaultValues: {
      organizerID: "",
      organizerName: "",
      organizerEmail: "",
      postTitle: "",
      description: "",
      category: "",
      location: "",
      volunteersNeeded: null,
      deadline: null,
      thumbnail: "",
    },
  });

  // Fetch post data and set as default values
  useEffect(() => {
    if (postID) {
      axios.get(`https://backend-volunteer-lagbe.vercel.app/volunteerneededpost/${postID.id}`)
        .then((res) => {
          const postData = res.data;

          // Set default values
          form.setValue("organizerID", postData.organizerID);
          form.setValue("organizerName", postData.organizerName);
          form.setValue("organizerEmail", postData.organizerEmail);
          form.setValue("postTitle", postData.postTitle);
          form.setValue("description", postData.description);
          form.setValue("category", postData.category);
          form.setValue("location", postData.location);
          form.setValue("volunteersNeeded", postData.volunteersNeeded);
          form.setValue(
            "deadline",
            new Date(postData.deadline.split("/").reverse().join("-"))
          ); // Convert to Date object
          form.setValue("thumbnail", postData.thumbnail);

          setSelectedDate(
            new Date(postData.deadline.split("/").reverse().join("-"))
          );
        })
        .catch((error) => {
          // console.error("Error fetching post data:", error);
        });
    }
  }, [postID, form]);

  const uploadFileToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://api.imgbb.com/1/upload?key=9a6f84f430229a50a927e5775a8d1091",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        form.setValue("thumbnail", data.data.url);
      } else {
        // console.error("Image upload failed:", data.error);
      }
    } catch (error) {
      // console.error("Error uploading image:", error);
    }
  };

  const onSubmit = (data) => {
    if (data.deadline) {
      const formattedDeadline = new Date(data.deadline).toLocaleDateString(
        "en-GB"
      ); // dd/mm/yyyy
      data.deadline = formattedDeadline;
    }
    data.volunteersNeeded = Number(data.volunteersNeeded);

    axios.put(`https://backend-volunteer-lagbe.vercel.app/volunteerneededpost/${postID.id}`,data)
      .then((res) => {
        console.log(res)
        if(res.status === 200)
        {
            Swal.fire({
                text: "Your Post Has Been Updated",
                icon: "success",
                confirmButtonText: "Continue",
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/all-needed-posts");
                }
              });
        }
   
      })
      .catch((error) => {
        if(error.status===400)
            {
                Swal.fire({
                    text: "Nothing Updated",
                    icon: "error",
                    confirmButtonText: "Continue",
                    allowOutsideClick: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate("/all-needed-posts");
                    }
                  });
            }
      });
  };

  return (
    <Card className="w-[80%] mx-auto p-8 my-10 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Update Volunteer Need Post
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Thumbnail */}
          <FormField
            name="thumbnail"
            control={form.control}
            rules={{ required: "Thumbnail is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <div className="flex items-center mb-4">
                  <input
                    id="photoUrlToggle"
                    type="checkbox"
                    className="mr-2"
                    checked={toggleImage}
                    onChange={(e) => setToggleImage(e.target.checked)}
                  />
                  <label htmlFor="photoUrlToggle" className="text-sm">
                    Use Photo URL
                  </label>
                </div>

                <FormControl>
                  {!toggleImage ? (
                    // File Upload Input
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          uploadFileToImgBB(file); // Handle file upload
                        }
                      }}
                    />
                  ) : (
                    // Photo URL Input
                    <Input
                      type="url"
                      placeholder="Enter photo URL"
                      onChange={(e) => {
                        const url = e.target.value;
                        field.onChange(url); // Pass the URL to form control
                      }}
                    />
                  )}
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Post Title */}
          <FormField
            name="postTitle"
            control={form.control}
            rules={{ required: "Post title is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter post title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            name="description"
            control={form.control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full p-2 bg-transparent border rounded-md"
                    placeholder="Enter a detailed description"
                    rows="4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            name="category"
            control={form.control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="e.g., healthcare, education, social service"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            name="location"
            control={form.control}
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Volunteers Needed */}
          <FormField
            name="volunteersNeeded"
            control={form.control}
            rules={{ required: "Number of volunteers needed is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. of Volunteers Needed</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of volunteers"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Deadline */}
          <FormField
            name="deadline"
            control={form.control}
            rules={{ required: "Deadline is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mr-5">Deadline</FormLabel>
                <FormControl>
                  <DatePicker
                    className="p-2 bg-transparent border-2"
                    selected={field.value}
                    onChange={(date) => {
                      if (date instanceof Date && !isNaN(date)) {
                        field.onChange(date);
                        setSelectedDate(date); // Set the selected date correctly
                      }
                    }}
                    showMonthDropdown
                    useShortMonthInDropdown
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Organizer Info */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Organizer Name */}
            <FormField
              name="organizerName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizer Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Logged-in user name"
                      readOnly
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Organizer Email */}
            <FormField
              name="organizerEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizer Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Logged-in user email"
                      readOnly
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Add Post Button */}
          <Button variant="destructive" type="submit" className="w-full text-lg">
            Update Post
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default MyVolunteerPostUpdate;
