import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/api/products";

export interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: File;
  imageUrl?: string;
  userId: string;
}

interface ProductsContextProps {
  products: Product[];
  disablePrevPage: boolean;
  disableNextPage: boolean;
  totalProducts: number;
  page: number;
  perPage: number;
  fetchProducts: (page: number, perPage: number) => void;
  fetchProductById: (id: string) => Promise<Product | null>;
  addProduct: (product: Omit<Product, "_id">) => void;
  updateProductInContext: (product: Product) => void;
  removeProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined
);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(3);
  const [disablePrevPage, setDisablePrevPage] = useState<boolean>(false);
  const [disableNextPage, setDisableNextPage] = useState<boolean>(false);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const fetchProducts = async (page: number, perPage: number) => {
    try {
      const data = await getProducts({ page, perPage });
      setProducts(() => [...data.products]);
      setPage(page);
      setPerPage(perPage);
      setDisablePrevPage(!data.hasPrevPage);
      setDisableNextPage(!data.hasNextPage);
      setTotalProducts(data.totalProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchProductById = async (id: string): Promise<Product | null> => {
    const existingProduct = products.find((p) => p._id === id);
    if (existingProduct) {
      return existingProduct;
    } else {
      const data = await getProduct(id);
      if (data.product) {
        return data.product;
      }
      return null;
    }
  };

  const addProduct = async (product: Omit<Product, "_id">) => {
    try {
      const data = await createProduct(product);
      setProducts((prevProducts) => {
        if (prevProducts.length < perPage) {
          return [...prevProducts, data.product];
        }
        return prevProducts;
      });
      setTotalProducts((currentTotalProducts) => currentTotalProducts + 1);
      setDisableNextPage(() => perPage * page > totalProducts);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProductInContext = async (updatedProduct: Product) => {
    const data = await updateProduct(updatedProduct);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === data.product._id ? data.product : product
      )
    );
  };

  const removeProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        page,
        perPage,
        disablePrevPage,
        disableNextPage,
        totalProducts,
        fetchProducts,
        fetchProductById,
        addProduct,
        updateProductInContext,
        removeProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
