import MainLayout from "@/components/Layouts/MainLayout";
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
      path: "/a",
      element: <div>a</div>,
    },
  ]);

export default router;