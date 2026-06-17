import React from "react";
import OverviewHeader from "./OverviewHeader";
import { ArrowUpDown, ChartNoAxesColumn, Ellipsis, Filter } from "lucide-react";

function SalesOverview() {
  return (
    <div className="w-full p-4">
      <OverviewHeader
        icon1={<ChartNoAxesColumn size={14} />}
        name="Sales Overview"
        icon2={<Filter size={14} />}
        icon3={<ArrowUpDown size={14} />}
        icon4={<Ellipsis size={14} />}
        value="$ 93, 400"
        stat="15.8%"
        color="emerald"
        details="+ $14,0674 increase"
      />
    </div>
  );
}

export default SalesOverview;
