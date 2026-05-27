import { useAuthContext } from "../contexts/AuthContexts";

function Dashboard() {
  const { user } = useAuthContext();

  const stats = [
    { title: "Total Balance", value: "R24,500" },
    { title: "Income", value: "R12,000" },
    { title: "Expenses", value: "R5,800" },
    { title: "Savings", value: "R6,700" },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <section className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back, {user?.name || "User"}
            </p>
          </div>

          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            Add Transaction
          </button>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                {item.value}
              </h2>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Transactions
            </h2>

            <div className="mt-4 space-y-4">
              {["Groceries", "Salary", "Netflix", "Transport"].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                >
                  <span className="font-medium text-gray-700">{item}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    R500
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Account Info
            </h2>

            <div className="mt-4 space-y-3 text-sm">
              <p className="text-gray-600">
                Email: <span className="font-medium">{user?.email}</span>
              </p>
              <p className="text-gray-600">
                Role: <span className="font-medium">{user?.role}</span>
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Dashboard;
