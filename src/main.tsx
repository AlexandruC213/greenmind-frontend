import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/components/App";
import Register from "@/components//registration/Register";
import Login from "@/components/registration/Login";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
