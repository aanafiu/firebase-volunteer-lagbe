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

const MyVolunteerPost = () => {
  const { user } = useContext(UserContext);
  const [userID, setUserID] = useState()

  axios.get(`http://localhost:5000/userinformation?email=${user.email}`)
  .then((res)=>{
    setUserID(res.data[0]._id)
    // console.log(res.data)
    // console.log(res.data[0]._id)
  })
  console.log(userID)

  const form = useForm({
    defaultValues: {
      organizerID: userID || "",
      organizerName: user?.name || "",
      organizerEmail: user?.email || "",
      postTitle: "",
      description: "",
      category: "",
      location: "",
      volunteersNeeded: "",
      deadline: null,
      thumbnail: "",
    },
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    if (user) {
      form.setValue("organizerName", user.displayName);
      form.setValue("organizerEmail", user.email);
    }
  }, [user, form]);

  const uploadFileToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=9a6f84f430229a50a927e5775a8d1091",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        setThumbnailUrl(data.data.url);
        form.setValue("thumbnail", data.data.url);
      } else {
        console.error("Image upload failed:", data.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSubmit = (data) => {
    if (data.deadline) {
        const formattedDeadline = new Date(data.deadline).toLocaleDateString("en-GB"); // Formats to dd/mm/yyyy
        console.log("Formatted Deadline:", formattedDeadline);
        data.deadline = formattedDeadline;
      }
      data.organizerID = userID;

    // console.log("Form Data:", data,userID );
    axios.post('http://localhost:5000/volunteerneededpost',{"data" : data})
    .then((res)=>
    {
        console.log(res);
    })
  };

  return (
    <div className="w-[80%] mx-auto p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Add Volunteer Need Post
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
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        uploadFileToImgBB(file);
                      }
                    }}
                  />
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
                  <DatePicker className="p-2"
                    selected={field.value}
                    onChange={(date) => {
                      field.onChange(date); 
                      setSelectedDate(date);
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
          <Button type="submit" className="w-full">
            Add Post
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MyVolunteerPost;
