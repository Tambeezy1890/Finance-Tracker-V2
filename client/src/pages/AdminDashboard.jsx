import React from "react";
import Navbar from "../components/NavBar";
import {
  Activity,
  ActivityIcon,
  AlertTriangle,
  Loader2,
  Search,
  ShieldCheck,
  Trash2,
  User,
  UserCheck,
} from "lucide-react";
import StatTile from "../components/StatTile";

function AdminDashboard() {
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 py-10">
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
              placeholder="Search Identity Vault....."
              className="w-full md:w-96 pl-9 pr-6 py-4 outline-none bg-white border border-slate-300 rounded-xl focus:border-indigo-500 transition-all placeholder:text-slate-300 hover:cursor-pointer text-sm font-medium text-slate-700 focus:ring-4 focus:ring-indigo-50 shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatTile
            icon={<User size={18} />}
            color="blue"
            label="Total Accounts"
            value={5}
          />
          <StatTile
            icon={<UserCheck size={18} />}
            color="emerald"
            label="Verified"
            value={2}
          />
          <StatTile
            icon={<ShieldCheck size={18} />}
            color="indigo"
            label="Privileged"
            value={1}
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
              10 records
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
                <tr className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 group-hover:border-indigo-50 transition">
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
                          User Name
                        </p>
                        <p className="text-sm text-medium text-slate-400">
                          User Email
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase`}
                    >
                      User Role
                    </span>
                  </td>
                  <td className="px-9 py-5">
                    <div className="flex items-center gap-2 ">
                      <div className={`w-1.5 rounded-full `}>
                        <span className="text-xs font-bold text-slate-600">
                          Verified
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 ">
                    <button className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-100 rounded-xl transition-all">
                      {/* conditional rendering */}
                      <Trash2 size={18} />
                      {/*  <span className="text-[10px] font-black text-indigo-400 bg-indigo-50 px-3 py-1 rounded-lg">
                        You
                      </span> */}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {/* Modal  */}
      {/* Conditional rendering */}
      {/* <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs ">
        <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl border border-white/20 ">
          <div className="h-16 w-16 bg-rose-50 text-rose-600 flex items-center justify-center rounded-2xl mx-auto mb-6">
            <AlertTriangle size={32} />
          </div>
          <h3 className="text-xl font-black text-center text-slate-900 mb-2 uppercase">
            System Purge
          </h3>
          <p className="text-center text-slate-500 font-medium mb-8 text-sm leading-relaxed">
            Remove{" "}
            <span className="text-slate-900 font-black">Delete User Name</span>?
            This is will permanentley revoke all access
          </p>
          <div className="flex flex-col gap-3">
            <button className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-rose-600 transition-colors flex justify-center">
              <Loader2 /> Confirm
            </button>
            <button className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-600 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default AdminDashboard;
