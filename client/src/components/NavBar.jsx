import { LogOut, UserIcon, Zap } from "lucide-react";

function Navbar() {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center ">
            <a href="#" className="flex items-center gap-2">
              <Zap size={24} className="text-indigo-600" />
              <span className="text-xl font-black text-slate-900 uppercase">
                Finance Tracker
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex item-center gap-3 ">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">User Name</p>
                <p className="text-slate-500 bg-slate-100 text-[10px] px-2 py-0.5 rounded uppercase tracking-tight">
                  User Role
                </p>
              </div>
              <a href="#" className="relative group">
                <div className="flex items-center justify-center border-2 border-slate-300 rounded-full w-10 h-10 group-hover:border-indigo-400 shadow-sm transition-all">
                  {/* Conditional rendering */}
                  <UserIcon size={20} />
                </div>
              </a>
            </div>
            <button className="text-slate-400 hover:bg-rose-50 hover:text-rose-500 p-2 rounded-lg transition-all">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
