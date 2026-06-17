import React, { useEffect, useMemo, useState } from "react";
import StatTile from "../components/StatTile";
import authService from "../services/api";
import { toast } from "react-hot-toast";
import { Trash2, Edit, Plus, Loader2, AlertTriangle } from "lucide-react";
import Transactions from "../components/Transactions";

function FinanceDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletingModal, setDeletingModal] = useState({
    show: false,
    transaction: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [originalDescription, setOriginalDescription] = useState("");
  const [addTransaction, setAddTransaction] = useState(false);
  const [open, setOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [editTransaction, setEditTransaction] = useState({
    show: false,
    transaction: null,
  });

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);

      const res = await authService.getTransactions();

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
  const handleDescriptionUpdate = async (id) => {
    const cleanNewValue = descriptionValue.trim();
    const cleanOldValue = originalDescription.trim();

    if (cleanNewValue === cleanOldValue) {
      setEditingId(null);
      setDescriptionValue("");
      setOriginalDescription("");
      return;
    }

    try {
      await authService.updateTransaction(id, {
        description: cleanNewValue,
      });

      setTransactions((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, description: cleanNewValue } : item
        )
      );

      toast.success("Description updated");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update description"
      );
    } finally {
      setEditingId(null);
      setDescriptionValue("");
      setOriginalDescription("");
    }
  };

  const handleDelete = async (id) => {
    try {
      await authService.deleteTransaction(id);

      setTransactions((prev) => prev.filter((item) => item._id !== id));

      toast.success("Transaction deleted");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete transaction"
      );
    } finally {
      setDeletingModal({ show: false, transaction: null });
    }
  };

  const formatMoney = (value) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(value);
  };
  const toggleTypeFilter = () => {
    setTypeFilter((prev) =>
      prev === "all" ? "expense" : prev === "expense" ? "income" : "all"
    );
  };
  const filteredTransactions = useMemo(() => {
    if (typeFilter === "all") return transactions;

    return transactions.filter((item) => item.type === typeFilter);
  }, [transactions, typeFilter]);
  const updateT = (id) => {};
  return (
    <div className="min-h-screen bg-[#f8fafc]">
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

            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
              onClick={() => setAddTransaction(true)}
            >
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
                    <th
                      className="px-6 py-4"
                      onClick={() => toggleTypeFilter()}
                    >
                      Type
                    </th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {item.title}
                      </td>

                      <td
                        className="px-6 py-4 text-slate-500"
                        onClick={() => {
                          setEditingId(item._id);
                          setDescriptionValue(item.description || "");
                          setOriginalDescription(item.description || "");
                        }}
                      >
                        {editingId === item._id ? (
                          <input
                            value={descriptionValue}
                            onChange={(e) =>
                              setDescriptionValue(e.target.value)
                            }
                            onBlur={() => handleDescriptionUpdate(item._id)}
                            autoFocus
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        ) : (
                          item.description || "--"
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm">
                          {item.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 ">
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
                        className={`px-6 py-4 font-bold  ${
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
                          <button
                            className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
                            onClick={() => {
                              setEditTransaction({
                                show: true,
                                transaction: item,
                              });
                              setAddTransaction(true);
                            }}
                          >
                            <Edit size={17} />
                          </button>

                          <button
                            className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                            onClick={() =>
                              setDeletingModal({
                                show: true,
                                transaction: item,
                              })
                            }
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
      {deletingModal.show && (
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
                onClick={() => handleDelete(deletingModal.transaction._id)}
              >
                <Loader2 /> Confirm
              </button>
              <button
                className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-600 transition-colors"
                onClick={() =>
                  setDeletingModal({ show: false, transaction: null })
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {(addTransaction || editTransaction.show) && (
        <Transactions
          addTransaction={setAddTransaction}
          updateTransaction={setEditTransaction}
          transactionData={editTransaction}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
}

export default FinanceDashboard;
