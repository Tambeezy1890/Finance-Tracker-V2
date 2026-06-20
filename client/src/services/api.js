import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";
const MODE = import.meta.env.MODE;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
const mockUser = {
  username: "Dev User",
  email: "dev@test.com",
  role: "admin",
};

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
      error.response?.data?.message?.includes("expired")
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post("/auth/v2/refresh-token");

        const newAccessToken = refreshResponse.data.accessToken;

        if (newAccessToken) {
          localStorage.setItem("access-token", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
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
  refreshToken: async () => {
    const response = await api.post("/auth/v2/refresh-token");

    if (response.data.accessToken) {
      localStorage.setItem("access-token", response.data.accessToken);
    }

    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
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
  updatePassword: async (token) => {
    const response = await api.patch(`/reset-password/${token}`);
    return response;
  },
  importTransactions: async (formData) => {
    const res = await api.post("/files/v2/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },

  exportTransactions: async () => {
    return api.get("/files/v2/export", {
      responseType: "blob",
    });
  },
};

export default authService;
