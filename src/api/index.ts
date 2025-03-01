import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "accept": "*/*",
  },
});

// axiosInstance.interceptors.request.use(
//   function (config) {
//     const token = Cookies.get("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );