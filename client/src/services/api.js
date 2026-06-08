import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/auth/v2",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const authService = {
  register: async (userData) => {
    const response = await api.post("/signup", { ...userData });
    return response;
  },
  resend: async (email) => {
    const response = await api.post("/resend-token", { email });
    return response;
  },
  verify: async (token) => {
    const response = await api.get(`/verify-email/${token}`, token);
    return response;
  },
  login: async (userData) => {
    const response = await api.post(`/login`, userData.data);
    return response;
  },
  forgotPass: async (email) => {
    const response = await api.post(`/forgot-password`, { email: email });
    console.log(response);
    return response;
  },
};

export default authService;
