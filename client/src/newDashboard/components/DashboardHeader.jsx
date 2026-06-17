import { Calendar, Filter, Import } from "lucide-react";
import React from "react";

function DashboardHeader() {
  return (
    <div className="w-full bg-slate-100 p-4 rounded-3xl shadow-sm">
      <div className="flex justify-between">
        <div className="flex-2 ">Dashboard</div>
        <div className="flex-1">
          <div className="flex gap-2 text-[12px] justify-center items-center">
            <div className="flex">
              <button className="  border border-slate-400 w-30 py-1">
                <input type="date" placeholder="Monthly" />
              </button>
              <button className="border px-2 py-1 border-slate-400">
                Monthly
              </button>
            </div>

            <button className="flex items-center border px-2 py-1 border-slate-400">
              <Filter size={14} className="inline-flex mr-2" />
              Filter
            </button>
            <button className="flex items-center border px-2 py-1 border-slate-400">
              <Import size={14} className="inline-flex mr-2" />
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
