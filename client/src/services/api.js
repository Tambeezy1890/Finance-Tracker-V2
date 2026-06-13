import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    const isAuthRoute =
      originalRequest.url.includes("/auth/v2/login") ||
      originalRequest.url.includes("/auth/v2/signup") ||
      originalRequest.url.includes("/auth/v2/refresh-token");

    if (
      (status === 401 && !isAuthRoute && !originalRequest._retry) ||
      error.response?.data?.message.includes("expired")
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/v2/refresh-token");

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/v2/signup", { ...userData });
    return response;
  },
  resend: async (email) => {
    const response = await api.post("/auth/v2/resend-token", { email });
    return response;
  },
  verify: async (token) => {
    const response = await api.get(`/auth/v2/verify-email/${token}`, token);
    return response;
  },
  login: async (userData) => {
    const response = await api.post(`/auth/v2/login`, userData);
    if (response.data.accessToken) {
      localStorage.setItem("access-token", response.data.accessToken);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user || response.data)
      );
    }
    return response;
  },
  forgotPass: async (email) => {
    const response = await api.post(`/auth/v2/forgot-password`, {
      email: email,
    });
    return response;
  },
  getUserDashboard: async () => {
    const response = await api.get("/auth/v2/user-dashboard");
    return response;
  },
  getAdminDashboard: async () => {
    const response = await api.get("/auth/v2/get-users");
    return response;
  },
  getUser: () => {
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;
    return user;
  },
  getCurrentUser: async () => {
    const response = await api.get("/auth/v2/me");
    return response.data;
  },
  logout: async () => {
    try {
      const response = await api.get("/auth/v2/logout");
      return response;
    } finally {
      localStorage.clear();
    }
  },
  deleteUser: async (userId) => {
    const response = await api.delete(`/auth/v2/delete-user/${userId}`);
    return response.data;
  },
  getTransactions: async () => {
    const response = await api.get("/finances/v2/transaction");
    return response.data;
  },
  deleteTransaction: async (id) => {
    const response = await api.delete(`/finances/v2/transaction/${id}`);
    return response;
  },
  addTransaction: async (transaction) => {
    const response = await api.post("/finances/v2/transaction", transaction);
    return response;
  },
  updateTransaction: async (id, data) => {
    const response = await api.patch(`/finances/v2/transaction/${id}`, data);
    return response;
  },
};

export default authService;
