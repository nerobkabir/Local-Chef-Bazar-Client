import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const PlatformStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/admin-stats")
      .then((res) => res.json())
      .then((data) => setStats(data.data));
  }, []);

  if (!stats) return <p className="text-center mt-20">Loading stats...</p>;

  const orderData = [
    { name: "Pending", value: stats.pendingOrders },
    { name: "Delivered", value: stats.deliveredOrders },
  ];

  const COLORS = ["#facc15", "#22c55e"];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Platform Statistics
      </h1>

      {/* ================= Cards ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Pending Orders</p>
          <h2 className="text-3xl font-bold text-yellow-500">
            {stats.pendingOrders}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Delivered Orders</p>
          <h2 className="text-3xl font-bold text-green-600">
            {stats.deliveredOrders}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <p className="text-gray-500">Total Payments</p>
          <h2 className="text-3xl font-bold text-blue-600">
            {stats.totalPaymentAmount} TK
          </h2>
        </div>
      </div>

      {/* ================= Charts ================= */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Orders Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4 text-center">
            Order Status Distribution
          </h2>

          <PieChart width={350} height={300}>
            <Pie
              data={orderData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {orderData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Payments Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4 text-center">
            Payments Overview
          </h2>

          <BarChart width={350} height={300} data={[
            { name: "Payments", amount: stats.totalPaymentAmount },
          ]}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#3b82f6" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default PlatformStats;
