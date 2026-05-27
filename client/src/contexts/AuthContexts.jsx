import { createContext, useContext, useState } from "react";
import api from "../../services/api";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [verified, setVerified] = useState(false);

  const signup = async (user) => {
    try {
      const res = await api.post("/auth/v2/signup", user);
      localStorage.setItem("accessToken", res.data.accessToken);
      setUser(res.data.user);

      return res.data.user;
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (user) => {
    try {
      const res = await api.post(`/auth/v2/login`, user);
      setUser(res.data.user);
      localStorage.setItem("accessToken", res.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
