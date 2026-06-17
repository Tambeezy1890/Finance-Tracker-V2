import { Users } from "lucide-react";
import React from "react";
import OverviewHeader from "./OverviewHeader";

function CategoryBreakdown() {
  return (
    <div>
      <OverviewHeader
        icon1={<Users size={14} />}
        name="Category Breakdowns"
        value=" 40 600"
        stat="15.8%"
        color="emerald"
        details="+ 2,674 increase"
      />
    </div>
  );
}

export default CategoryBreakdown;
