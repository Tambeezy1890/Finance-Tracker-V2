import React, { useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import authService from "../services/api";
import Navbar from "../components/NavBar";
import SideBar from "../components/SideBar";

function TransactionsAnalytics() {
  const [sidebar, setSidebar] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const COLORS = [
    "#6366f1",
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
  ];

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

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar setSidebar={setSidebar} sidebar={sidebar} />
      {sidebar && <SideBar />}

      <main className="px-8 md:px-16 lg:px-28 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-800">
            Transaction Analytics
          </h1>
          <p className="text-slate-400 mt-1">
            Summary of your income, expenses, and spending patterns.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard title="Income" value={formatMoney(analytics.income)} />
          <SummaryCard
            title="Expenses"
            value={formatMoney(analytics.expenses)}
          />
          <SummaryCard title="Balance" value={formatMoney(analytics.balance)} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Expenses by Category">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.categoryData}
                  dataKey="amount"
                  nameKey="category"
                  outerRadius={100}
                  label
                >
                  {analytics.categoryData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatMoney(value)} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Income vs Expenses">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatMoney(value)} />
                <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />

                <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Monthly Spending Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatMoney(value)} />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#6366f1"
                  strokeWidth={4}
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Category Breakdown">
            <div className="space-y-4">
              {analytics.categoryData.map((item) => (
                <div
                  key={item.category}
                  className="flex items-center justify-between border-b border-slate-100 pb-3"
                >
                  <span className="font-semibold text-slate-600">
                    {item.category}
                  </span>
                  <span className="font-black text-slate-800">
                    {formatMoney(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>
        </section>
      </main>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl border border-slate-200 shadow-sm p-6">
      <p className="text-sm font-bold text-slate-400 uppercase">{title}</p>
      <h2 className="text-2xl font-black text-slate-800 mt-2">{value}</h2>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-linear-to-br from-white to-slate-50 rounded-3xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-lg font-black text-slate-800 mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default TransactionsAnalytics;
