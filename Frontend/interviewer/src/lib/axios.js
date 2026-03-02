import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // VERY IMPORTANT
  withCredentials: true,                // REQUIRED for Clerk
});

export default axiosInstance;