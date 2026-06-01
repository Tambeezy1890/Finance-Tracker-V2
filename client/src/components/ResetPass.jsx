import { AlertCircle, Loader2, Lock, LockIcon, ShieldIcon } from "lucide-react";

function ResetPass() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="max-w-md w-full p-8 space-y-8">
        <div className="text-center">
          <div className="inline-flex bg-emerald-600 text-white h-16 w-16 items-center justify-center rounded-2xl shadow-emerald-100 shadow-2xl mb-4">
            <ShieldIcon size={32} strokeWidth={2.5} />
          </div>
          <h2 className="font-black text-3xl tracking-tight text-slate-800 ">
            Reset Value Key
          </h2>
          <p className="uppercase font-medium text-[12px] mt-4 text-slate-500 tracking-widest">
            Define your new Security credentials below
          </p>
        </div>
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-9 sm:p-10 ">
          {/* conditional rendering */}
          {/* <div className="mb-6 flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl">
            <AlertCircle size={18} className="shrink-0" />
            <p className="text-[10px] font-black uppercase tracking-widest leading-tight">
              Error
            </p>
          </div> */}

          <form action="#" className="space-y-5">
            <div>
              <label className="block text-slate-400 text-[11px] tracking-tight mb-2 ml-4 font-black uppercase">
                New Password
              </label>
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-all">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  className="block w-full pl-11 pr-12 py-4 focus:ring-4 border border-slate-200 text-sm rounded-2xl focus:ring-emerald-50 text-slate-900 focus:border-emerald-600 outline-none focus:bg-white font-medium transition-all placeholder:text-slate-300 "
                  placeholder="........."
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-400 text-[11px] tracking-tight mb-2 ml-4 font-black uppercase">
                Confirm Password
              </label>
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-all">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  className="block w-full pl-11 pr-12 py-4 focus:ring-4 border border-slate-200 text-sm rounded-2xl focus:ring-emerald-50 text-slate-900 focus:border-emerald-600 outline-none focus:bg-white font-medium transition-all placeholder:text-slate-300 "
                  placeholder=""
                />
              </div>
            </div>
            <div className="mt-8 ">
              <button className="bg-slate-900 w-full p-4 rounded-2xl text-white inline-flex items-center justify-center active:bg-slate-800 hover:bg-indigo-700 outline-none">
                <Loader2 size={18} className="mr-2 " /> Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default ResetPass;
