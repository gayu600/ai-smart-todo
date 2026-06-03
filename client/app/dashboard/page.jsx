"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import StatCard from "@/components/dashboard/StatCard";
import AIAssistant from "@/components/dashboard/AIAssistant";
import ActivityList from "@/components/dashboard/ActivityList";

import { CheckCircle2, TrendingUp, Calendar } from "lucide-react";
import { fetchAnalytics } from "@/store/features/analytics/analyticsSlice";

export default function DashboardPage() {
  const dispatch = useDispatch();

  const { stats, loading } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (loading) {
    return <p className="text-gray-400">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Total Tasks"
          value={stats?.total || 0}
          subtitle={`${stats?.completed || 0} completed tasks`}
          icon={<CheckCircle2 size={18} className="text-white" />}
          color="bg-blue-500"
        />

        <StatCard
          title="Productivity Score"
          value={`${stats?.productivityScore || 0}%`}
          subtitle={`${stats?.pending || 0} pending tasks`}
          icon={<TrendingUp size={18} className="text-white" />}
          color="bg-gradient-to-r from-pink-500 to-purple-500"
        />

        <StatCard
          title="Most Productive Day"
          value={stats?.mostProductiveDay || "N/A"}
          subtitle={`${stats?.completedTasks || 0} tasks completed`}
          icon={<Calendar size={18} className="text-white" />}
          color="bg-green-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <AIAssistant />
        <ActivityList />
      </div>
    </div>
  );
}