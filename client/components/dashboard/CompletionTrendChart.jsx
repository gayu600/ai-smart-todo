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

export default function CompletionTrendChart({ data = [] }) {
  return (
    <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
      <h3 className="font-semibold mb-2 text-white">
        Task Completion Trend
      </h3>

      <p className="text-gray-400 text-sm mb-4">
        Completed vs pending tasks
      </p>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />

          <XAxis dataKey="week" stroke="#aaa" />

          <YAxis stroke="#aaa" />

          <Tooltip
            contentStyle={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#fff",
            }}
          />

          <Bar dataKey="completed" fill="#10b981" radius={[6, 6, 0, 0]} />

          <Bar dataKey="pending" fill="#f59e0b" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}