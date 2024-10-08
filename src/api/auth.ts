import axiosInstance from "./axios";
import Cookies from "js-cookie";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
  rememberFor30Days: boolean;
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  password: string;
  token: string | null;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.data?.length) {
      throw new Error(error.response.data.data[0].msg);
    } else {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    const { token, userId } = response.data;
    const expireInOneHour = 1 / 24;
    Cookies.set("authToken", token, {
      expires: data.rememberFor30Days ? 30 : expireInOneHour,
    });
    Cookies.set("userId", userId, {
      expires: data.rememberFor30Days ? 30 : expireInOneHour,
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.data?.length) {
      throw new Error(error.response.data.data[0].msg);
    } else {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }
};

export const forgotUserPassword = async (data: ForgotPasswordData) => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password", data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.data?.length) {
      throw new Error(error.response.data.data[0].msg);
    } else {
      throw new Error(error.response?.data?.message || "Sending email failed!");
    }
  }
};

export const resetUserPassword = async (data: ResetPasswordData) => {
  try {
    const response = await axiosInstance.post("/auth/reset-password", data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.data?.length) {
      throw new Error(error.response.data.data[0].msg);
    } else {
      throw new Error(
        error.response?.data?.message || "Reseting password failed!"
      );
    }
  }
};
