import { createContext, useContext, useState } from "react";
import api from "../services/api";
import authService from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoding] = useState(false);
  const [verified, setVerified] = useState(false);

  const login = async (data) => {
    try {
      setIsLoding(true);
      const response = await authService.login(data);
      setUser((await response).data.user);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    } finally {
      setIsLoding(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

/* <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="mt-4 text-slate-500 font-bold tracking-tight uppercase text-[10px]">
            Syncing Session....
          </p>
        </div> */
