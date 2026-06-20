import { Download, Filter, Upload } from "lucide-react";
import React from "react";
import authService from "../../services/api";

function DashboardHeader({
  period,
  setPeriod,
  selectedDate,
  setSelectedDate,
  typeFilter,
  setTypeFilter,
}) {
  const handleImport = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await authService.importTransactions(formData);
  };

  const handleExport = async () => {
    const res = await authService.exportTransactions();

    const url = window.URL.createObjectURL(new Blob([res.data]));

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-slate-100 p-2 md:p-4 md:rounded-3xl shadow-sm">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-2">
        <div className="flex-2">Dashboard</div>

        <div className="flex flex-col md:flex-row gap-2 text-[12px] justify-center items-center">
          <div className="flex">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-slate-400 px-2 py-1 bg-transparent"
            />

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="border border-slate-400 px-2 py-1 bg-transparent"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setPeriod(e.target.value)}
              className="border border-slate-400 px-2 py-1 bg-transparent"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="all">All Time</option>
            </select>
            <label className="flex items-center border px-2 py-1 border-slate-400 cursor-pointer">
              <Upload size={14} className="mr-2" />
              Import
              <input
                type="file"
                accept=".csv"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button
              onClick={handleExport}
              className="flex items-center border px-2 py-1 border-slate-400"
            >
              <Download size={14} className="mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
