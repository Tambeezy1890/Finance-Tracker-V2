import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function Charts({ show, data = [], categories = [] }) {
  const revenueData = [
    {
      month: "Jan",
      revenue: 4200,
      users: 2400,
    },
    {
      month: "Feb",
      revenue: 3800,
      users: 2100,
    },
    {
      month: "Mar",
      revenue: 5200,
      users: 3200,
    },
    {
      month: "Apr",
      revenue: 6100,
      users: 4100,
    },
    {
      month: "May",
      revenue: 4900,
      users: 3600,
    },
    {
      month: "Jun",
      revenue: 7200,
      users: 5300,
    },
  ];

  const trafficData = [
    {
      day: "Mon",
      visitors: 1200,
      conversions: 400,
    },
    {
      day: "Tue",
      visitors: 2100,
      conversions: 900,
    },
    {
      day: "Wed",
      visitors: 1800,
      conversions: 700,
    },
    {
      day: "Thu",
      visitors: 2600,
      conversions: 1200,
    },
    {
      day: "Fri",
      visitors: 3200,
      conversions: 1800,
    },
    {
      day: "Sat",
      visitors: 2800,
      conversions: 1500,
    },
    {
      day: "Sun",
      visitors: 1900,
      conversions: 800,
    },
  ];

  return (
    <div className="p-2">
      {/* LINE CHART */}
      {show == "line" ? (
        <div className="bg-slate-50 rounded-3xl shadow-md p-6 border border-slate-100">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              Income vs Expenses
            </h2>

            <p className="text-sm text-slate-400">
              Monthly revenue & active users
            </p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  backgroundColor: "#fff",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                }}
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#6366f1",
                }}
                activeDot={{
                  r: 8,
                }}
              />

              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#06b6d4",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-3xl shadow-md p-6 border border-slate-100">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-800">
              Expense Categories
            </h2>

            <p className="text-sm text-slate-400">
              Spending grouped by category
            </p>
          </div>
          {show == "bar" ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                layout="vertical"
                margin={{
                  top: 10,
                  right: 20,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                <XAxis
                  type="number"
                  tick={{ fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  type="category"
                  dataKey="category"
                  width={90}
                  tick={{ fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    backgroundColor: "#fff",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                />

                <Bar
                  dataKey="amount"
                  fill="#6366f1"
                  radius={[0, 12, 12, 0]}
                  barSize={22}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    backgroundColor: "#fff",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                />

                <Legend />

                {categories.map((category, index) => (
                  <Area
                    key={category}
                    type="monotone"
                    dataKey={category}
                    stroke={index % 2 === 0 ? "#6366f1" : "#14b8a6"}
                    fill={index % 2 === 0 ? "#6366f1" : "#14b8a6"}
                    fillOpacity={0.25}
                    strokeWidth={3}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      )}
      {/* AREA CHART */}
    </div>
  );
}

export default Charts;
