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
  const [period, setPeriod] = useState("monthly");
  const [selectedDate, setSelectedDate] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await authService.getTransactions();
      setTransactions(res.transactions || []);
    };

    fetchTransactions();
  }, []);
  const visibleTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesType = typeFilter === "all" || item.type === typeFilter;

      const matchesDate =
        !selectedDate ||
        new Date(item.date).toISOString().slice(0, 10) === selectedDate;

      return matchesType && matchesDate;
    });
  }, [transactions, typeFilter, selectedDate]);
  const analytics = useMemo(() => {
    const income = visibleTransactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const expenses = visibleTransactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const categoryTotals = {};

    visibleTransactions
      .filter((item) => item.type === "expense")
      .forEach((item) => {
        categoryTotals[item.category] =
          (categoryTotals[item.category] || 0) + Number(item.amount || 0);
      });
    const monthlyCategoryTotals = {};

    visibleTransactions
      .filter((item) => item.type === "expense")
      .forEach((item) => {
        const month = new Date(item.date).toLocaleString("default", {
          month: "short",
        });

        if (!monthlyCategoryTotals[month]) {
          monthlyCategoryTotals[month] = { month };
        }

        monthlyCategoryTotals[month][item.category] =
          (monthlyCategoryTotals[month][item.category] || 0) +
          Number(item.amount || 0);
      });

    const monthlyCategoryData = Object.values(monthlyCategoryTotals);
    const categories = [
      ...new Set(
        visibleTransactions
          .filter((item) => item.type === "expense")
          .map((item) => item.category)
      ),
    ];

    const categoryData = Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount,
      }))
      .sort((a, b) => a.amount - b.amount);
    const monthlyTotals = {};

    visibleTransactions.forEach((item) => {
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
      income,
      monthlyCategoryData,
      categories,
    };
  }, [visibleTransactions]);

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
        <DashboardHeader
          period={period}
          setPeriod={setPeriod}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />
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
            <Charts show="bar" data={analytics.categoryData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
