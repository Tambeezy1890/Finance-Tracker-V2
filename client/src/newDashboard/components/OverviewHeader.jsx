import { Signal } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import authService from "../../services/api";
function OverviewHeader({ icon1, name, value, color, stat, details }) {
  const palette = {
    slate: "bg-slate-400 text-slate-800",
    emerald: "bg-emerald-50 text-emerald-500",
    sky: "bg-sky-400 text-sky-800",
    rose: "bg-rose-50 text-rose-500",
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {icon1}
            <p className="text-md font-bold text-slate-700">{name}</p>
          </div>
        </div>

        <div>
          <h1>{value}</h1>
          <div className="flex gap-2">
            <p
              className={`${palette[color]} text-sm font-medium tracking-tight`}
            >
              {stat}
            </p>
            <p className="text-sm font-medium tracking-tight text-slate-400">
              {details}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OverviewHeader;
