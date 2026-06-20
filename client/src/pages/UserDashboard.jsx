import {
  AlertCircle,
  BadgeCheck,
  Camera,
  ExternalLink,
  Fingerprint,
  Key,
  Loader2,
  Lock,
  Mail,
  RefreshCcw,
  ShieldCheck,
  User,
  UserIcon,
} from "lucide-react";

import StatTile from "../components/StatTile";
import ProfileRow from "../components/ProfileRow";
import SecurityItem from "../components/SecurityItem";
import { useAuthContext } from "../contexts/AuthContexts";
import { useState } from "react";
import authService from "../services/api";
import toast from "react-hot-toast";
import { useEffect } from "react";

function UserDashboard() {
  const { user, currentUser } = useAuthContext();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const emailVerified = user.data?.isEmailVerified || user.isEmailVerified;
  const username = user.data?.username || user?.name;
  const email = user.data?.email || user?.email;
  const role = user.data?.role || user.role;
  const createdAt =
    user.data?.createdAt.slice(0, 10) || user?.createdAt.slice(0, 10);

  const name = useEffect(() => {
    fetchDashoardData();
    console.log(user);
  }, []);

  const fetchDashoardData = async () => {
    setLoading(true);
    try {
      const response = await authService.getUserDashboard();
      setDashboardData(response.data);

      return response;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to get user dashboard";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  const handleResendVerification = async () => {
    setSendingEmail(true);
    try {
      await authService.resend(user.email);
      toast.success("Verification link sent to your inbox");
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to resend verification";
      toast.error(message);
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <>
      {user && (
        <div className="min-h-screen bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-10">
            {/* Welcome */}
            <div className="flex flex-col mb-8 md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                  Welcome, {username}
                </h1>
                <p className="mt-1 text-slate-500 font-medium">
                  Realtime security oversight and profile management
                </p>
              </div>
              <div className="text-[10px] font-black text-slate-400 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-400 uppercase tracking-widest">
                Identity Node: {}
                {role}
              </div>
            </div>
            {/* Verification alret */}
            {/* Conditional rendering */}
            {emailVerified ? (
              <></>
            ) : (
              <div className="mb-8 bg-amber-50 p-6 border border-amber-100 flex flex-col md:flex-row rounded-4xl gap-4 items-center">
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
                <button
                  className={`flex items-center gap-2 py-3 px-6 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-black rounded-xl shadow-2xl shadow-amber-200 transition-all disabled:opacity-50 uppercase tracking-widest ${loading ? "disabled:opacity-5 bg-black/50" : ""}`}
                  onClick={() => {
                    (handleResendVerification(), setLoading(true));
                  }}
                >
                  {/* Conditional rendering */}
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Resend Link"
                  )}
                </button>
              </div>
            )}
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
                color={emailVerified ? "emerald" : "amber"}
                value={emailVerified ? "Verified" : "Pending"}
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

                <div className="flex flex-col md:flex-row gap-12 items-center md:items-start ">
                  <div className="relative group">
                    <div className="flex items-center justify-center w-32 h-32 rounded-3xl bg-slate-100 border-4 border-white shadow-xl overflow-hidden">
                      {/*  <img src="" alt="" className="w-full object-cover h-full" /> */}
                      {/* conditional rendering */}
                      <span className="text-3xl font-black text-slate-300 text-center">
                        {username}
                      </span>
                    </div>
                    <button className="absolute -right-2 -bottom-2 bg-indigo-600 p-2 rounded-xl text-white shadow-lg hover:scale-110 transition-transform">
                      <Camera size={18} />
                    </button>
                  </div>
                  <div className="flex-1 w-full space-y-1 ">
                    <ProfileRow
                      label="Legal Name"
                      value={username}
                      icon={<User />}
                      size={16}
                    />
                    <ProfileRow
                      label="Email Address"
                      value={email}
                      icon={<Mail />}
                      size={16}
                      badge={"bg-rose-50 text-rose-600"}
                    />
                    <ProfileRow
                      label="Access Level"
                      value={role}
                      icon={<Lock />}
                      size={16}
                      badge={"bg-indigo-50 text-indigo-600"}
                    />
                    <ProfileRow
                      label="Registered"
                      value={createdAt}
                      icon={<RefreshCcw />}
                      size={16}
                    />
                  </div>
                </div>
              </div>
              {/* Security features */}
              <div
                className="bg-slate-900 rounded-[2.5rem] p-10 text-white \
          relative overflow-hidden shadow-2xl shadow-slate-200"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <h2 className="text-sm font-black mb-8 flex items-center gap-3 uppercase tracking-widest text-indigo-500">
                  <ShieldCheck />
                  Active Encryption
                </h2>
                <ul className="space-y-5">
                  <SecurityItem
                    icon={<Key size={18} />}
                    text="Argon2id Hashing"
                  />
                  <SecurityItem
                    icon={<Fingerprint size={18} />}
                    text="JWT Verification"
                  />
                  <SecurityItem
                    icon={<RefreshCcw size={18} />}
                    text="Rotational Refresher"
                  />
                  <SecurityItem
                    icon={<Lock size={18} />}
                    text="Cross-Site Protection"
                  />
                </ul>
                <div className="mt-12 pt-8 border-t border-white/5">
                  <p className="text-[11px] font-black tracking-widest mb-3 text-slate-500 uppercase">
                    System login
                  </p>
                  <p className="text-sm text-indigo-100/70 leading-relaxed font-medium italic">
                    Secure encrypted link established
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default UserDashboard;
