import {
  AlertCircle,
  BadgeCheck,
  Camera,
  ExternalLink,
  Fingerprint,
  ShieldCheck,
  UserIcon,
} from "lucide-react";
import Navbar from "../components/NavBar";
import StatTile from "../components/StatTile";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-10">
        {/* Welcome */}
        <div className="flex flex-col mb-8 md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
              Welcome, User name
            </h1>
            <p className="mt-1 text-slate-500 font-medium">
              Realtime security oversight and profile management
            </p>
          </div>
          <div className="text-[10px] font-black text-slate-400 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-400 uppercase tracking-widest">
            Identity Node: {}
            Admin
          </div>
        </div>
        {/* Verification alret */}
        {/* Conditional rendering */}
        <div className="mb-8 bg-amber-50 p-6 border border-amber-100 flex md:flex-row rounded-4xl gap-4 items-center">
          <div className="flex items-center justify-center bg-amber-100 w-10 h-10 rounded-2xl text-amber-400 shrink-0 shadow-sm">
            <AlertCircle size={24} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-amber-900 font-black tracking-tight uppercase text-sm">
              Verification required
            </h2>
            <p className="text-amber-700 font-medium text-sm">
              Confirm your email to unlock high-level system permissions
            </p>
          </div>
          <button className="flex items-center gap-2 py-3 px-6 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-black rounded-xl shadow-2xl shadow-amber-200 transition-all disabled:opacity-50 uppercase tracking-widest">
            {/* Conditional rendering */}
            Resend Link
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatTile
            icon={<UserIcon size={18} />}
            label="Stats"
            color="blue"
            value="Active"
          />
          <StatTile
            icon={<BadgeCheck size={18} />}
            label="Protocol"
            color="indigo"
            value="Shielded"
          />
          <StatTile
            icon={<ShieldCheck size={18} />}
            label="Identity"
            color="emerald"
            value="Verified"
          />
          <StatTile
            icon={<Fingerprint size={18} />}
            label="Node Id"
            color="slate"
            value="........"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile card */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 md:p-12">
            <div className="flex items-center justify-between bg-10">
              <h2 className="text-sm text-slate-900 font-black uppercase tracking-widest ">
                Account Credentials
              </h2>
              <button className="flex gap-1.5 items-center text-[10px] text-indigo-600 font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all hover:bg-indigo-50 cursor-pointer">
                Edit profile <ExternalLink size={18} />
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
              <div className="relative group">
                <div className="flex items-center justify-center w-32 h-32 rounded-3xl bg-slate-100 border-4 border-white shadow-xl overflow-hidden">
                  {/*  <img src="" alt="" className="w-full object-cover h-full" /> */}
                  {/* conditional rendering */}
                  <span className="text-3xl font-black text-slate-300 text-center">
                    User Name
                  </span>
                </div>
                <button className="absolute -right-2 -bottom-2 bg-indigo-600 p-2 rounded-xl text-white shadow-lg hover:scale-110 transition-transform">
                  <Camera size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
