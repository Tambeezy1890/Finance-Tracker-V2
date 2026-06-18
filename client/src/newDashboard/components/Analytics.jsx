import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import { Activity, Database, Eye } from "lucide-react";
import MonthlyOverview from "./MonthlyOverview";
import CategoryBreakdown from "./CategoryBreakdowns";
import Charts from "./Charts";
import React, { useEffect, useMemo, useState } from "react";
import authService from "../../services/api";

function Analytics() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await authService.getTransactions();
      setTransactions(res.transactions || []);
    };

    fetchTransactions();
  }, []);

  const analytics = useMemo(() => {
    const income = transactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const expenses = transactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const categoryTotals = {};

    transactions
      .filter((item) => item.type === "expense")
      .forEach((item) => {
        categoryTotals[item.category] =
          (categoryTotals[item.category] || 0) + Number(item.amount || 0);
      });

    const categoryData = Object.entries(categoryTotals).map(
      ([category, amount]) => ({
        category,
        amount,
      })
    );

    const monthlyTotals = {};

    transactions.forEach((item) => {
      const month = new Date(item.date).toLocaleString("default", {
        month: "short",
      });

      if (!monthlyTotals[month]) {
        monthlyTotals[month] = {
          month,
          income: 0,
          expenses: 0,
        };
      }

      if (item.type === "income") {
        monthlyTotals[month].income += Number(item.amount || 0);
      } else {
        monthlyTotals[month].expenses += Number(item.amount || 0);
      }
    });

    return {
      income,
      expenses,
      balance: income - expenses,
      categoryData,
      monthlyData: Object.values(monthlyTotals),
    };
  }, [transactions]);

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(value);

  const summaries = [
    {
      icon: <Eye />,
      name: "Income",
      value: formatMoney(analytics?.income),
      stat: "15.8%",
      color: "emerald",
    },
    {
      icon: <Database />,
      name: "Expenses",
      value: formatMoney(analytics?.expenses),
      stat: "34.04%",
      color: "rose",
    },
    {
      icon: <Activity />,
      name: "Balance",
      value: formatMoney(analytics?.balance),
      stat: "24.5%",
      color: "emerald",
    },
  ];
  return (
    <div className="max-w-full  ">
      <div className="mx-4 ">
        <DashboardHeader />
      </div>
      <div className="flex gap-6 overflow-x-auto mt-8  scrollbar-none justify-evenly">
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
      <div className="flex flex-col lg:flex-row gap-4 mt-4 min-w-0 w-full">
        <div className="flex-2 bg-slate-200/50 rounded-lg ">
          <MonthlyOverview />
          <Charts show="line" data={analytics.monthlyData} />
        </div>
        <div className="flex-1 bg-slate-100/50 rounded-2xl p-4 border border-slate-200 lg:mt-0 md:mt-4">
          <CategoryBreakdown />
          <div className="mt-4 min-w-0 w-full">
            <Charts data={analytics.categoryData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
