import React from "react";
const colors = {
  slate: "bg-slate-400 text-slate-800",
  emerald: "bg-emerald-50 text-emerald-500",
  sky: "bg-sky-400 text-sky-800",
  rose: "bg-rose-50 text-rose-500",
};
function IconCards({ icon, value, name, color }) {
  return (
    <div className="w-full">
      <div className="flex">
        <div
          className={`${colors[color]} flex justify-center items-center mr-2`}
        >
          {icon}
        </div>
        <div>
          <h1>{name}</h1>
          <p>{value}</p>
        </div>
      </div>
    </div>
  );
}

export default IconCards;
