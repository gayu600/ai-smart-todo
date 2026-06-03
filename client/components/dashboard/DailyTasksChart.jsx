"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function DailyTasksChart({ data = [] }) {
  const chartData = data.map((item) => ({
    day: item.day,
    tasks: item.value,
  }));

  return (
    <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
      <h3 className="text-white font-semibold">
        Daily Tasks Completed
      </h3>

      <p className="text-gray-400 text-sm mb-4">
        Number of tasks completed each day this week
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <defs>
            <linearGradient
              id="taskGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#333"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="day"
            stroke="#aaa"
          />

          <YAxis
            stroke="#aaa"
          />

          <Tooltip
            contentStyle={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#fff",
            }}
          />

          <Bar
            dataKey="tasks"
            fill="url(#taskGradient)"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}