import Login from "@/components/Authentication/Login";
import Register from "@/components/Authentication/Register";
import AllNeededPost from "@/components/Common/AllNeededPost";
import Error from "@/components/Common/Error";
import PostDetails from "@/components/Common/PostDetails/PostDetails";
import Home from "@/components/Home/Home";
import MainLayout from "@/components/Layouts/MainLayout";
import UserLayout from "@/components/Layouts/UserLayout";
import PrivateRoutes from "@/components/Provider/PrivateRoutes";
import MyProfile from "@/components/Provider/UserProfile/MyProfile";
import MyVolunteerPost from "@/components/Provider/UserProfile/MyVolunteerPost";
import MyVolunteerPostUpdate from "@/components/Provider/UserProfile/MyVolunteerPostUpdate";
import {
    createBrowserRouter,
  } from "react-router-dom";

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<Error></Error>,
      children: [
        {
          path:"",
          element:<Home></Home>
        },
        {
          path:"all-needed-posts",
          element:<AllNeededPost></AllNeededPost>,
          // loader: ()=> fetch("https://backend-volunteer-lagbe.vercel.app/volunteerneededpost")
        },
        {
          path:"posts/:id",
          element:<PrivateRoutes><PostDetails></PostDetails></PrivateRoutes>,
          loader:(({params})=>fetch(`https://backend-volunteer-lagbe.vercel.app/volunteerneededpost/${params.id}`))
        }
      ]
    },
    {
      path: "/user",
      element: <UserLayout></UserLayout>,
      errorElement:<Error></Error>,
      children: [
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
          element:<PrivateRoutes><MyVolunteerPost></MyVolunteerPost></PrivateRoutes>
        },
        {
          path:"updatepost/:id",
          element:<PrivateRoutes><MyVolunteerPostUpdate/></PrivateRoutes>
        },
        {
          path:"posts/:id",
          element:<PrivateRoutes><PostDetails></PostDetails></PrivateRoutes>,
          loader:(({param})=>fetch(`https://backend-volunteer-lagbe.vercel.app/volunteerneededpost/${param.id}`))
        }
      ]
    },
    {
      path: "/a",
      element: <div>a</div>,
    },
  ]);

export default router;