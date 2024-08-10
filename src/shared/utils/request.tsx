import axios from "axios";

import { getToken } from "./functions/auth";

const API_BASE_URL = "https://interview.t-alpha.com.br";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
