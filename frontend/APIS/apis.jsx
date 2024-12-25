import axios from "axios";
const USER = "/api/user";
const GENDER = "/api/gender";
const INTEREST = "/api/interest";

let user = null;

export const logInUser = async (data) => {
  localStorage.setItem("user", JSON.stringify(data));
  user = data;
};

export const logoutUser = () => {
  localStorage.removeItem("user");
  user = null;
};

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    if (user) {
      config.headers.Authorization = `Bearer ${user?.token}`;
    }

    return config;
  },
  (error) => {
    // console.log(error);
  }
);

export const requestOtp = async (data) => {
  return await axiosInstance.post(`${USER}/sendotp`, data);
};
export const verifyOtp = async (data) => {
  return await axiosInstance.post(`${USER}/verifyotp`, data);
};
export const authenticateUser = async (data) => {
  return await axiosInstance.post(`${USER}/authenticate`, data);
};

export const getGenders = async () => {
  return await axiosInstance.get(`${GENDER}/`);
};

export const getInterests = async () => {
  return await axiosInstance.get(`${INTEREST}/`);
};
export const createPartialUser = async (data) => {
  return await axiosInstance.post(`${USER}/`, data);
};
export const createCompleteUser = async (data) => {
  return await axiosInstance.post(`${USER}/complete`, data);
};
