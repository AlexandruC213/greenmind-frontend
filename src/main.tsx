import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/index";
import { ProductsProvider } from "./context/ProductsContext";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <ProductsProvider>
        <RouterProvider router={router} />
      </ProductsProvider>
    </ChakraProvider>
  </React.StrictMode>
);
