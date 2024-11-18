import axios from "axios";

export const BaseUrl = "https://mern-ecommerce-i13m.onrender.com";
export const ReferralBaseUrl = "https://mern-ecommerce-i13m.onrender.com/signup";
const AxiosInstance = axios.create({
  baseURL: "https://mern-ecommerce-i13m.onrender.com",
});
// export const BaseUrl = "https://fivegworld.onrender.com";
// export const ReferralBaseUrl = "https://fivegworldd.onrender.com/signup";
// const AxiosInstance = axios.create({
//   baseURL: "https://fivegworld.onrender.com",
// });

AxiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("admin-token");
  config.headers["Authorization"] = `Bearer ${token}`;
  config.headers["Access-control-Allow-Origin"] = "*";
  return config;
});
export default AxiosInstance;