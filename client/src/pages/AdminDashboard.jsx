import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import {
  Activity,
  ActivityIcon,
  AlertCircle,
  AlertTriangle,
  Loader2,
  Search,
  ShieldCheck,
  Trash2,
  User,
  UserCheck,
} from "lucide-react";
import StatTile from "../components/StatTile";
import { useAuthContext } from "../contexts/AuthContexts";
import authService from "../services/api";
import toast from "react-hot-toast";
import SideBar from "../components/SideBar";

function AdminDashboard() {
  let { user: currentUser } = useAuthContext();
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    users: [],
  });
  const [loading, setLoading] = useState(true);
  const [deleteModel, setDeleteModel] = useState({ show: false, user: null });
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const fetchAdminData = useCallback(async () => {
    try {
      const response = await authService.getAdminDashboard();
      setDashboard(
        {
          totalUsers: response.data.users.length,
          users: response.data.users,
        } || { totalUsers: 0, users: [] }
      );
    } catch (err) {
      const status = err.response?.status;

      if (status === 403) {
        toast.error("Access Denied: You do not have admin privileges");
      } else if (status === 401) {
        toast.error("Session Expired: Please login again");
      } else {
        toast.error("Security Sync Failed: System offline or unauthorized");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleResendVerification = async () => {
    setSendingEmail(true);
    try {
      await authService.resend(currentUser.email);
      toast.success("Verification link sent to your inbox");
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to resend verification";
      toast.error(message);
    } finally {
      setSendingEmail(false);
    }
  };
  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const handleDeleteUser = async (userId) => {
    if (userId === currentUser?._id || userId === currentUser?.id) {
      toast.error("Operation Denied: Self-termination restricted");
      setDeleteModel({ show: false, user: null });
      return;
    }
    setDeleting(true);
    try {
      const response = await authService.deleteUser(userId);
      toast.success("User deleted successfully");
      setDeleteModel({ show: false, user: null });
      fetchAdminData();
      return response;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete user";
      toast.error(message);
    } finally {
      setDeleting(false);
    }
  };
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="mt-4 text-slate-500 font-bold tracking-tight uppercase text-[10px]">
          Syncing Session....
        </p>
      </div>
    );
  }
  const filteredUsers =
    dashboard.users?.filter(
      (u) =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const adminCount =
    dashboard.users?.filter((u) => u.role === "admin").length || 0;

  const verifiedUsers =
    dashboard.users?.filter((u) => u.isEmailVerified).length || 0;
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const userCount = dashboard.users?.length;

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar setSidebar={setSidebar} sidebar={sidebar} />
      {<SideBar sidebar={sidebar} />}

      <main
        className={`max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 py-10 
    sidebar ? "lg:ml-64" : ""`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
              Admin Control
            </h1>
            <p className="text-sm font-medium text-slate-400 tracking-widest ">
              High level management of user identities
            </p>
          </div>
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-indigo-600"
              size={18}
            />
            <input
              type="text"
              name="filter"
              placeholder="Search Identity Vault....."
              className="w-full md:w-96 pl-9 pr-6 py-4 outline-none bg-white border border-slate-300 rounded-xl focus:border-indigo-500 transition-all placeholder:text-slate-300 hover:cursor-pointer text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-50 shadow-sm"
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </div>
        {currentUser.isEmailVerified ? (
          <></>
        ) : (
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
            <button
              className={`flex items-center gap-2 py-3 px-6 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-black rounded-xl shadow-2xl shadow-amber-200 transition-all disabled:opacity-50 uppercase tracking-widest  disabled:pointer-events-none disabled:cursor-not-allowed `}
              onClick={() => {
                (handleResendVerification(), setSendingEmail(true));
              }}
              disabled={sendingEmail}
            >
              {/* Conditional rendering */}
              {sendingEmail ? (
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
        <div className="grid grid-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatTile
            icon={<User size={18} />}
            color="blue"
            label="Total Accounts"
            value={userCount}
          />
          <StatTile
            icon={<UserCheck size={18} />}
            color="emerald"
            label="Verified"
            value={verifiedUsers}
          />
          <StatTile
            icon={<ShieldCheck size={18} />}
            color="indigo"
            label="Privileged"
            value={adminCount}
          />
          <StatTile
            icon={<ActivityIcon size={18} />}
            color="slate"
            label="Status"
            value="Secured"
          />
        </div>
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-4 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-900 uppercase tsracking-wide">
              Identity Records
            </h2>
            <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-6 py-1 rounded-2xl">
              {filteredUsers.length}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr>
                  <th className="px-8 py-4 text-[12px] font-black text-slate-400 uppercase tracking-widest">
                    Profile
                  </th>
                  <th className="px-8 py-4 text-[12px] font-black text-slate-400 uppercase tracking-widest">
                    Access
                  </th>
                  <th className="px-8 py-4 text-[12px] font-black text-slate-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-4 text-[12px] font-black text-slate-400 uppercase tracking-widest">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-400">
                {/* mapping method */}
                <tr className="hover:bg-slate-50/30 transition-colors group border-b border-red-900 ">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-900 border border-slate-200 group-hover:border-indigo-50 transition">
                        {/* conditional based rendering */}
                        <img
                          src="https://ui-avatars.com/api/?name=jogn"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <div className="w-full h-full flex justify-end items-center text-xs font-light text-slate-400">
                          User name
                        </div>
                      </div>
                      <div className="">
                        <p className="text-sm text-bold text-slate-900">
                          {currentUser.name}
                        </p>
                        <p className="text-sm text-medium text-slate-400">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase   `}
                    >
                      {currentUser.role}
                    </span>
                  </td>
                  <td className="px-9 py-5">
                    <div className="flex items-center gap-2 ">
                      <div className={`w-1.5 rounded-full `}>
                        <span className="text-xs font-bold text-slate-600">
                          {currentUser.isEmailVerified ? (
                            <>Verified</>
                          ) : (
                            "Pending"
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-slate-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-slate-900">
                        {user.username}
                      </p>
                      <p className="text-sm font-medium text-slate-400">
                        {user.email}
                      </p>
                    </td>

                    <td className="px-4 py-5">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-9 py-5">
                      <span className="text-xs font-bold text-slate-600">
                        {currentUser.isEmailVerified ? (
                          <>Verified</>
                        ) : (
                          "Pending"
                        )}
                      </span>
                    </td>

                    <td className="px-8 py-5">
                      <button
                        className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-100 rounded-xl transition-all"
                        onClick={() => setDeleteModel({ show: true, user })}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {/* Modal  */}
      {/* Conditional rendering */}
      {deleteModel.show && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs ">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl border border-white/20 ">
            <div className="h-16 w-16 bg-rose-50 text-rose-600 flex items-center justify-center rounded-2xl mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-black text-center text-slate-900 mb-2 uppercase">
              System Purge
            </h3>
            <p className="text-center text-slate-500 font-medium mb-8 text-sm leading-relaxed">
              Remove{" "}
              <span className="text-slate-900 font-black">
                Delete {deleteModel.user.username}
              </span>
              ? This is will permanentley revoke all access
            </p>
            <div className="flex flex-col gap-3">
              <button
                className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-rose-600 transition-colors flex justify-center"
                onClick={() => handleDeleteUser(deleteModel.user?._id)}
              >
                <Loader2 /> Confirm
              </button>
              <button
                className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-600 transition-colors"
                onClick={() => setDeleteModel({ show: false })}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
