import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/NavBar";
import SideBar from "../components/SideBar";
import StatTile from "../components/StatTile";
import authService from "../services/api";
import { toast } from "react-hot-toast";
import { Trash2, Edit, Plus, Loader2, AlertTriangle } from "lucide-react";

function FinanceDashboard() {
  const [sidebar, setSidebar] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fetchTransactions = async () => {
    try {
      setIsLoading(true);

      const res = await authService.getTransactions();
      console.log(res);
      setTransactions(res.transactions || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to load transactions"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const totals = useMemo(() => {
    const income = transactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const expenses = transactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    return {
      wallet: income - expenses,
      salary: income,
      budget: expenses,
    };
  }, [transactions]);

  const handleDelete = async (id) => {
    if (!confirmDelete) return;

    try {
      await authService.delete(`/transactions/${id}`);

      setTransactions((prev) => prev.filter((item) => item._id !== id));

      toast.success("Transaction deleted");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete transaction"
      );
    }
  };

  const formatMoney = (value) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar setSidebar={setSidebar} sidebar={sidebar} />

      {sidebar && <SideBar />}

      <main className="w-full mt-4 px-8 md:px-16 lg:px-28">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatTile
            value="Wallet"
            label={formatMoney(totals.wallet)}
            color="blue"
          />
          <StatTile
            value="Budget"
            label={formatMoney(totals.budget)}
            color="amber"
          />
          <StatTile
            value="Salary"
            label={formatMoney(totals.salary)}
            color="purple"
          />
        </section>

        <section className="mt-10 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Recent Transactions
              </h2>
              <p className="text-sm text-slate-400">
                Manage your income and expenses
              </p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700">
              <Plus size={16} />
              Add Transaction
            </button>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-slate-400">
              Loading transactions...
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              No transactions found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {transactions.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {item.title}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {item.description || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                          {item.category}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            item.type === "income"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.type}
                        </span>
                      </td>

                      <td
                        className={`px-6 py-4 font-bold ${
                          item.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.type === "income" ? "+" : "-"}
                        {formatMoney(Number(item.amount || 0))}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {item.date
                          ? new Date(item.date).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-3">
                          <button className="p-2 rounded-lg hover:bg-blue-50 text-blue-600">
                            <Edit size={17} />
                          </button>

                          <button
                            className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                            onClick={() => setDeleting(true)}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
      {deleting && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs ">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl border border-white/20 ">
            <div className="h-16 w-16 bg-rose-50 text-rose-600 flex items-center justify-center rounded-2xl mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-black text-center text-slate-900 mb-2 uppercase">
              System Purge
            </h3>
            <p className="text-center text-slate-500 font-medium mb-8 text-sm leading-relaxed">
              Press
              <span className="text-slate-900 font-black"> Confirm{}</span>?
              This is will permanentley revoke all access
            </p>
            <div className="flex flex-col gap-3">
              <button
                className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-rose-600 transition-colors flex justify-center"
                onClick={() => handleDelete(item._id)}
              >
                <Loader2 /> Confirm
              </button>
              <button
                className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-600 transition-colors"
                onClick={() => setDeleting(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinanceDashboard;
