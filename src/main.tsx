import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";

import AuthForm from "@/components/registration/AuthForm";
import TermsPolicy from "@/components/registration/TermsPolicy";
import ForgotPassword from "@/components/registration/ForgotPassword";
import AuthLayout from "@/components/layouts/AuthLayout";

import "./index.css";

const authRoutes: RouteObject[] = [
  {
    path: "/register",
    element: <AuthForm />,
  },
  {
    path: "/login",
    element: <AuthForm />,
  },
  {
    path: "/terms-policy",
    element: <TermsPolicy />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ForgotPassword />,
  },
];

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [...authRoutes],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
