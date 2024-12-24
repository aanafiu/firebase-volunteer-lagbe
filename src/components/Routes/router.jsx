import Login from "@/components/Authentication/Login";
import Register from "@/components/Authentication/Register";
import AllNeededPost from "@/components/Common/AllNeededPost";
import Home from "@/components/Home/Home";
import MainLayout from "@/components/Layouts/MainLayout";
import UserLayout from "@/components/Layouts/UserLayout";
import MyProfile from "@/components/Provider/UserProfile/MyProfile";
import MyVolunteerPost from "@/components/Provider/UserProfile/MyVolunteerPost";
import {
    createBrowserRouter,
  } from "react-router-dom";

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path:"",
          element:<Home></Home>
        },
        {
          path:"all-needed-posts",
          element:<AllNeededPost></AllNeededPost>
        }
      ]
    },
    {
      path: "/user",
      element: <UserLayout></UserLayout>,
      children: [
        {
          path:"",
          element:<Login/>
        },
        {
          path:"login",
          element:<Login/>
        },
        {
          path:"register",
          element:<Register/>
        },
        {
          path:"myprofile",
          element:<MyProfile></MyProfile>
        },
        {
          path:"myposts",
          element:<MyVolunteerPost></MyVolunteerPost>
        },
        {
          path:"be-a-volunteer",
          element:<AllNeededPost/>
        }
      ]
    },
    {
      path: "/a",
      element: <div>a</div>,
    },
  ]);

export default router;