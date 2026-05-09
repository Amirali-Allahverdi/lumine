import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

http.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  },
);
