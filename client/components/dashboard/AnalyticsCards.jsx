"use client";

import {
  TrendingUp,
  CheckCircle2,
  Calendar,
  Target,
} from "lucide-react";

export default function AnalyticsCards({ stats }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-4 gap-6">

      {/* Productivity Score */}
      <div className="bg-[#111] border border-gray-800 p-6 rounded-xl flex justify-between">
        <div>
          <p className="text-gray-400 text-sm">
            Productivity Score
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.productivityScore || 0}%
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Based on completed tasks
          </p>
        </div>

        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-500">
          <TrendingUp size={18} className="text-white" />
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="bg-[#111] border border-gray-800 p-6 rounded-xl flex justify-between">
        <div>
          <p className="text-gray-400 text-sm">
            Tasks Completed
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.completed || 0}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Total completed tasks
          </p>
        </div>

        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-500">
          <CheckCircle2 size={18} className="text-white" />
        </div>
      </div>

      {/* Most Productive Day */}
      <div className="bg-[#111] border border-gray-800 p-6 rounded-xl flex justify-between">
        <div>
          <p className="text-gray-400 text-sm">
            Most Productive Day
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {stats.mostProductiveDay || "N/A"}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Peak performance day
          </p>
        </div>

        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500">
          <Calendar size={18} className="text-white" />
        </div>
      </div>

      {/* Completion Rate */}
      <div className="bg-[#111] border border-gray-800 p-6 rounded-xl flex justify-between">
        <div>
          <p className="text-gray-400 text-sm">
            Completion Rate
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stats.productivityScore || 0}%
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Overall success rate
          </p>
        </div>

        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-500">
          <Target size={18} className="text-white" />
        </div>
      </div>

    </div>
  );
}