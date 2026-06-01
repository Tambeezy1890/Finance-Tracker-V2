import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContexts";

import {
  AlertCircle,
  ChevronRight,
  Lock,
  Mail,
  User,
  Eye,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
function Signup() {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { signup } = useAuthContext();
  const handleSignup = async (e) => {
    e.preventDefault();
    const user = signup(data);
    if (user) {
    }
  };

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f8fafc] py-12 px-4">
      <div className="max-w-md w-full space-y-8  py-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[1.25rem] bg-indigo-600 text-white shadow-xl shadow-indigo-100 mb-6">
            <UserPlus size={28} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            Create an Account
          </h2>
          <p className="font-medium text-slate-500 mt-3">
            Initialize your profile to access the vault
          </p>
        </div>
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 sm:p-18 ">
          {/* conditional rendering */}
          {/*  <div className="mb-6 flex items-center gap-2 p-4 bg-rose-50 border border-rose-100">
            <AlertCircle size={18} className="shrink-0" />
            <p className="text-[10px] font-black uppercase tracking-wide">
              Error
            </p>
          </div> */}
          <form className="py-2 ">
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase-widest my-1 ml-1 ">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-600 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="username"
                  required
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 focus:bg-white transition-all outline-none placeholder:text-slate-300 font-medium"
                  placeholder="e.g username120"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase-widest mb-1 ml-1">
                Identity (Email)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 focus:bg-white transition-all outline-none placeholder:text-slate-300 font-medium"
                  placeholder="name@agency.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-slate-400 ml-1 my-1 uppercase-widest">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 focus:bg-white transition-all outline-none placeholder:text-slate-300 font-medium"
                  placeholder=". . . . . . . . ."
                />
                <button
                  type="button"
                  className=" absolute inset-y-0 right-0 pr-4 flext items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-black text-slate-400 ml-1 my-1 uppercase-widest">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 focus:bg-white transition-all outline-none placeholder:text-slate-300 font-medium"
                  placeholder=". . . . . . . . ."
                />
              </div>
            </div>

            <div className="mt-4 block">
              <button
                type="submit"
                className="flex items-center justify-center tracking-widest uppercase text-xs  text-white active:scale-[0.90] font-black  w-full p-4 rounded-[1.3rem] bg-slate-900 shadow-lg shodow-slate-200
                disabled:opacity-70 hover:bg-indigo-500 transition-all duration-200 "
              >
                Create Account
              </button>
            </div>
          </form>
          <div className="mt-10  border border-slate-50 text-center">
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex justify-center">
              Already have an account? Log in
              <Link to="/login">
                <ChevronRight
                  size={13}
                  strokeWidth={3}
                  className="ml-4 hover:bg-indigo-400"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
