import Login from "@/components/Authentication/Login";
import Register from "@/components/Authentication/Register";
import MainLayout from "@/components/Layouts/MainLayout";
import UserLayout from "@/components/Layouts/UserLayout";
import {
    createBrowserRouter,
  } from "react-router-dom";

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path:"/",
          element:<div>I am outlet</div>
        }
      ]
    },
    {
      path: "/user",
      element: <UserLayout></UserLayout>,
      children: [
        {
          path:"/user",
          element:<Login/>
        },
        {
          path:"/user/login",
          element:<Login/>
        },
        {
          path:"/user/register",
          element:<Register/>
        }
      ]
    },
    {
      path: "/a",
      element: <div>a</div>,
    },
  ]);

export default router;