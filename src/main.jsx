import * as React from "react";
import * as ReactDOM from "react-dom/client";
// import {RouterProvider} from "react-router-dom";
import "./index.css";import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

import { RouterProvider } from "react-router-dom";
import router from "@/components/Routes/router";
import { ThemeProvider } from "@/components/Provider/theme-provider";
import AuthProvider from "@/components/Provider/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
