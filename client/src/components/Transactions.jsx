import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import authService from "../services/api";

function Transactions({
  addTransaction,
  updateTransaction,
  transactionData,
  setIsLoading,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    amount: "",
  });

  const [error, setError] = useState(null);
  const [transaction, setTransaction] = useState({
    title: "",
    category: "",
    description: "",
    type: "",
    date: "",
    amount: "",
  });
  const handleUpdate = (e) => {
    setTransaction((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleUpdated = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await authService.updateTransaction(
        transactionData.transaction._id,
        transaction
      );
      const message = res.data?.message || "Transaction added successfully";

      toast.success(message);
      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Invalid input";
      setError(message);
      toast.error(message);
    } finally {
      updateTransaction({ show: false, transaction: null });
      addTransaction(false);

      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (transactionData.show) {
      setTransaction({
        title: transactionData.transaction.title,
        category: transactionData.transaction.category,
        description: transactionData.transaction.description,
        type: transactionData.transaction.type,
        date: transactionData.transaction.date,
        amount: transactionData.transaction.amount,
      });
      console.log(transactionData);
    }
  }, [transactionData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleTransaction = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await authService.addTransaction(formData);
      const message = res.data?.message || "Transaction added successfully";

      toast.success(message);
      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Invalid input";
      setError(message);
      toast.error(message);
    } finally {
      updateTransaction({ show: false, transaction: null });
      addTransaction(false);
      setIsLoading(false);
    }
  };

  if (transactionData.show) {
    return (
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
        onClick={() => {
          addTransaction(false);
          updateTransaction({ show: false, transaction: null });
        }}
      >
        <div
          className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition"
            onClick={() => {
              addTransaction(false);
              updateTransaction({ show: false, transaction: null });
            }}
          >
            <X size={18} className="text-slate-500" />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Add Transaction
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Track your income and expenses
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">
                Title
              </label>

              <input
                type="text"
                value={transaction.title}
                onChange={(e) => handleUpdate(e)}
                name="title"
                placeholder="Netflix Subscription"
                className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                onChange={(e) => handleUpdate(e)}
                value={transaction.amount}
                placeholder="500"
                className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Category
              </label>

              <select
                className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="category"
                value={transaction.category}
                onChange={(e) => handleUpdate(e)}
              >
                <option value="">-- Select an Option --</option>
                <option value="food">food</option>
                <option value="travel">travel</option>
                <option value="salary">salary</option>
                <option value="health">health</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">Type</label>

              <select
                className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="type"
                value={transaction.type}
                onChange={(e) => handleUpdate(e)}
              >
                <option value="">-- Select an Option --</option>
                <option value="income">income</option>
                <option value="expense">expense</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition mt-2"
              onClick={handleUpdated}
            >
              Save Transaction
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
        onClick={() => {
          addTransaction(false);
          updateTransaction({ show: false, transaction: null });
        }}
      >
        <div
          className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition"
            onClick={() => {
              addTransaction(false);
              updateTransaction({ show: false, transaction: null });
            }}
          >
            <X size={18} className="text-slate-500" />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Add Transaction
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Track your income and expenses
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">
                Title
              </label>

              <input
                type="text"
                value={formData.title}
                name="title"
                onChange={(e) => handleChange(e)}
                placeholder="Netflix Subscription"
                className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={(e) => handleChange(e)}
                placeholder="500"
                className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">
                Category
              </label>

              <select
                className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="category"
                value={formData.category}
                onChange={(e) => handleChange(e)}
              >
                <option value="">-- Select an Option --</option>
                <option value="food">food</option>
                <option value="travel">travel</option>
                <option value="salary">salary</option>
                <option value="health">health</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-600">Type</label>

              <select
                className="w-full mt-2 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="type"
                value={formData.type}
                onChange={(e) => handleChange(e)}
              >
                <option value="">-- Select an Option --</option>
                <option value="income">income</option>
                <option value="expense">expense</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition mt-2"
              onClick={handleTransaction}
            >
              Save Transaction
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Transactions;
