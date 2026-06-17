import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Bell,
  Gift,
  LogOut,
  PlusCircle,
  Search,
  Zap,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContexts";
import authService from "../../services/api";
import toast from "react-hot-toast";

function Navbar({ setSidebar, sidebar }) {
  const { user } = useAuthContext();
  const username = user?.username || user?.name || "guest";
  const role = user?.role || "user";

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    await authService.logout();
    toast.success("Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  return (
    <div className="w-full  bg-white border-b border-slate-400 sticky top-0 z-10 pt-2">
      <div className="flex gap-3">
        <div className=" bg-slate-50 flex-1 border-r p-3 rounded-xs ">
          <div className="w-full relative">
            <div className="flex">
              <Zap size={20} /> Finance Tracker
            </div>
            <div className="absolute right-2 inset-y-0">
              {!sidebar ? (
                <ArrowLeftToLine
                  size={18}
                  className="translate-y-1 sm:hidden lg:block"
                  onClick={() => setSidebar(!sidebar)}
                />
              ) : (
                <ArrowRightToLine
                  size={18}
                  className="translate-y-1 sm:hidden lg:block"
                  onClick={() => setSidebar(!sidebar)}
                />
              )}
            </div>
          </div>
        </div>
        <div className="bg-slate-50 flex-3 rounded-2xl ">
          <div className="flex justify-between">
            <div className="relative w-[60%]">
              <input
                type="text"
                className="pl-6 py-2 outline-none border border-slate-400 w-full rounded-2xl focus:border-indigo-300 focus:text-indigo-400"
                placeholder="Search..."
              />
              <Search
                className="absolute inset-y-0 translate-y-3 left-0 translate-x-1"
                strokeWidth={1}
                size={18}
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <Gift size={18} strokeWidth={1} />
              <Bell size={18} strokeWidth={1} />
              <PlusCircle size={18} strokeWidth={1} />
            </div>
          </div>
        </div>
        <div className=" flex-1  border-l">
          <div className="flex gap-1 items-center h-full ml-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-[5px] font-semibold text-white uppercase tracking-wider border-2 border-slate-300  group-hover:border-indigo-400 shadow-sm">
              {username}
            </div>
            <div className="ml-2 flex flex-col items-center">
              <h3 className="font-bold text-sm text-slate-700 tracking-tight">
                {username}
              </h3>
              <p className="font-medium text-[12px] tracking-wide text-slate-400">
                {role}
              </p>
            </div>
            <button
              className="text-slate-400 hover:bg-rose-50 hover:text-rose-500 p-2 rounded-lg transition-colors mx-auto"
              onClick={handleLogout}
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
