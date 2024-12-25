import Login from "@/components/Authentication/Login";
import Register from "@/components/Authentication/Register";
import AllNeededPost from "@/components/Common/AllNeededPost";
import PostDetails from "@/components/Common/PostDetails/PostDetails";
import Home from "@/components/Home/Home";
import MainLayout from "@/components/Layouts/MainLayout";
import UserLayout from "@/components/Layouts/UserLayout";
import PrivateRoutes from "@/components/Provider/PrivateRoutes";
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
          element:<AllNeededPost></AllNeededPost>,
          loader: ()=> fetch("http://localhost:5000/volunteerneededpost")
        },
        {
          path:"posts/:id",
          element:<PostDetails></PostDetails>,
          loader:(({params})=>fetch(`http://localhost:5000/volunteerneededpost/${params.id}`))
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
          element:<PrivateRoutes><MyProfile></MyProfile></PrivateRoutes>
        },
        {
          path:"myposts",
          element:<MyVolunteerPost></MyVolunteerPost>
        },
        {
          path:"be-a-volunteer",
          element:<AllNeededPost/>,
          loader: ()=> fetch("http://localhost:5000/volunteerneededpost")
        },
        {
          path:"posts/:id",
          element:<PostDetails></PostDetails>,
          loader:(({param})=>fetch(`http://localhost:5000/volunteerneededpost/${param.id}`))
        }
      ]
    },
    {
      path: "/a",
      element: <div>a</div>,
    },
  ]);

export default router;