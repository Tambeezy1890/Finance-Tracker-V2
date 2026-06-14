import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../services/api";
import authService from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("access-token");
        const storedUser = authService.getUser();

        if (!token || !storedUser) {
          setIsLoading(false);
          return;
        }
        const response = await authService.getCurrentUser();
        const userData = response?.user || response;
        storedUser ? setUser(storedUser) : setUser(userData);
        setCurrentUser(response.data);
      } catch (err) {
        const message =
          err.response?.data?.message || "Failed to get user data";
        toast.error(message);
        localStorage.removeItem("access-token");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (data) => {
    try {
      setIsLoading(true);
      const response = await authService.login(data);
      setUser((await response).data.user);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      const message = err.response?.data?.message || "Failed to logout";
      toast.error(message);
    } finally {
      setUser(null);
    }
  };
  const updateUser = useCallback((userData) => {
    const clearData = userData.user || userData;
    setUser(clearData);
    if (clearData) {
      localStorage.setItem("user", JSON.stringify(clearData));
    }
  }, []);

  const value = {
    user,
    login,
    isLoading,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    currentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/*  */
