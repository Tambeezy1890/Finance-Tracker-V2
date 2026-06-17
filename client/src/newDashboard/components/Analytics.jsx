import React from "react";
import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import { Activity, Database, Eye } from "lucide-react";
import SalesOverview from "./SalesOverview";
import TotalSubscribers from "./TotalSubscribers";
import Charts from "./Charts";

function Analytics() {
  const summaries = [
    {
      icon: <Eye />,
      name: "Page Views",
      value: "12,450",
      stat: "15.8%",
      color: "emerald",
    },
    {
      icon: <Database />,
      name: "Total Revenue",
      value: "$363.95",
      stat: "34.04%",
      color: "rose",
    },
    {
      icon: <Activity />,
      name: "Bounce Rate",
      value: "86.5%",
      stat: "24.5%",
      color: "emerald",
    },
    {
      icon: <Activity />,
      name: "Budget",
      value: "86.5%",
      stat: "24.5%",
      color: "emerald",
    },
  ];
  return (
    <div className="max-w-full  ">
      <DashboardHeader />
      <div className="flex gap-6 overflow-x-auto mt-8 p- scrollbar-none">
        {summaries.map((summary) => (
          <div className="min-w-75 max-w-75 p-2" key={summary.name}>
            <StatCard
              icon={summary.icon}
              value={summary.value}
              name={summary.name}
              stat={summary.stat}
              color={summary.color}
            />
          </div>
        ))}
      </div>
      <div className="flex mt-4 gap-2 md:flex-col lg:flex-row">
        <div className="flex-2 bg-slate-200/50 rounded-lg ">
          <SalesOverview />
          <Charts show="line" className="" />
        </div>
        <div className="flex-1 bg-slate-100/50 rounded-2xl p-4 border border-slate-200 lg:mt-0 md:mt-4">
          <TotalSubscribers />
          <div className="mt-4">
            <Charts />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
