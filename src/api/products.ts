import axiosInstance from "./axios";
import { Product } from "@/context/ProductsContext";

interface PaginationProductsData {
  page: number | string;
  perPage: number | string;
}

export const getProducts = async (data: PaginationProductsData) => {
  try {
    const response = await axiosInstance.get(
      `/products?page=${data.page}&perPage=${data.perPage}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.data?.length) {
      throw new Error(error.response.data.data[0].msg);
    } else {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const createProduct = async (data: Omit<Product, "_id">) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("image", data.image);
    formData.append("userId", data.userId);

    const response = await axiosInstance.post("/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.data?.data?.length) {
      throw new Error(error.response.data.data[0].msg);
    } else {
      throw new Error(
        error.response?.data?.message || "Creating product failed"
      );
    }
  }
};

export const updateProduct = async (data: Product) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("image", data.image);
    formData.append("userId", data.userId);

    const response = await axiosInstance.put(`/product/${data._id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.data?.data?.length) {
      throw new Error(error.response.data.data[0].msg);
    } else {
      throw new Error(
        error.response?.data?.message || "Updating product failed"
      );
    }
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await axiosInstance.delete(`/product/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Deleting product failed");
  }
};
