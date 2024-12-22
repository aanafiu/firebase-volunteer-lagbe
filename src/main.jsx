import * as React from "react";
import * as ReactDOM from "react-dom/client";
// import {RouterProvider} from "react-router-dom";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "@/components/Routes/router";
import { ThemeProvider } from "@/components/Provider/theme-provider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
