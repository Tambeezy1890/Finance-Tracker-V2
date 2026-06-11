import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContexts";
import { toast } from "react-hot-toast";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LogIn,
  Mail,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../services/api";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();

  const [data, setData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/dashboard";

  const { email, password, rememberMe } = data;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await login({ email, password });
      toast.success(`Welcome back ${response.data.user.name.split(" ")[0]}!`);
      navigate(from, { replace: true });
      return response;
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Login failed";
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f8fafc] py-12 px-4">
      <div className="max-w-md w-full space-y-8  py-4 rounded-xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[1.25rem] bg-indigo-600 text-white shadow-xl shadow-indigo-100 mb-6">
            <LogIn size={28} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            Account Login
          </h2>
          <p>Enter your credentials to access the vault</p>
        </div>
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 sm:p-18 ">
          {/* conditional rendering */}
          {error && (
            <div className="mb-6 flex items-center gap-2 p-4 bg-rose-50 border border-rose-100">
              <AlertCircle size={18} className="shrink-0" />
              <p className="text-[10px] font-black uppercase tracking-wide">
                {error}
              </p>
            </div>
          )}
          <form className="py-2 " onSubmit={handleSubmit}>
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">
                Identity (Email)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  required
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 focus:bg-white transition-all outline-none placeholder:text-slate-300 font-medium"
                  placeholder="name@agency.com"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mt-4">
                <label className="block text-[11px] font-black text-slate-400 ml-1 my-1 uppercase-widest">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="block text-[11px] font-black text-slate-400 my-1 mr-1 uppercase-widest
                    hover:text-indigo-400 transition-colors"
                >
                  Forgot password
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  required
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 focus:bg-white transition-all outline-none placeholder:text-slate-300 font-medium"
                  placeholder=". . . . . . . . ."
                  onChange={(e) => handleChange(e)}
                />
                <button
                  type="button"
                  className=" absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center ">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={rememberMe}
                className="w-4 h-4 ml-1 border-slate-300 text-indigo-600 focus:ring-indigo-500
                  cursor-pointer rounded-[10px]"
                onChange={(e) => handleChange(e)}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-xs text-slate-500 font-bold cursor-pointer"
              >
                Remember Me
              </label>
            </div>
            <div className="mt-4 block">
              <button
                type="submit"
                className="flex items-center justify-center tracking-widest uppercase text-xs  text-white active:scale-[0.90] font-black  w-full p-4 rounded-[1.3rem] bg-slate-900 shadow-lg shadow-slate-200
                  disabled:opacity-70 hover:bg-indigo-500 transition-all duration-200 "
              >
                {isLoading ? (
                  <div className="flex">
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Loading.....
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <div className="mt-10  border border-slate-50 text-center">
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex justify-center">
              New to the system?
              <Link
                to="/signup"
                className="text-[10px] text-indigo-400 hover:text-indigo-300 flex ml-2 group"
              >
                Register Now
                <ChevronRight
                  size={13}
                  strokeWidth={3}
                  className=" group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
