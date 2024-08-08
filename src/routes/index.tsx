import { RouteObject } from "react-router-dom";

import AuthLayout from "../components/layouts/AuthLayout";
import MainLayout from "@/components/layouts/MainLayout";

import AuthForm from "../components/registration/AuthForm";
import TermsPolicy from "@/components/registration/TermsPolicy";
import ForgotPassword from "@/components/registration/ForgotPassword";

import ProductsPage from "@/components/products/ProductsPage";
import ProductPage from "@/components/products/ProductPage";

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

const productsRoutes: RouteObject[] = [
  {
    path: "",
    element: <ProductsPage />,
  },
  {
    path: ":id",
    element: <ProductPage />,
  },
];

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [...authRoutes],
  },
  {
    path: "/products",
    element: <MainLayout />,
    children: [...productsRoutes],
  },
  { path: "/settings", element: <div>Settings Page</div> },
];

export default routes;
