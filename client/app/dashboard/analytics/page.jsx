"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AnalyticsCards from "@/components/dashboard/AnalyticsCards";
import WeeklyProductivityChart from "@/components/dashboard/WeeklyProductivityChart";
import CompletionTrendChart from "@/components/dashboard/CompletionTrendChart";
import DailyTasksChart from "@/components/dashboard/DailyTasksChart";
import Insights from "@/components/dashboard/Insights";
import WeeklySummary from "@/components/dashboard/WeeklySummary";

import { fetchAnalytics } from "@/store/features/analytics/analyticsSlice";

export default function AnalyticsPage() {
  const dispatch = useDispatch();

  const { stats, loading } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (loading) {
    return <p className="text-gray-400">Loading analytics...</p>;
  }

  return (
    <div className="space-y-8">
      <AnalyticsCards stats={stats} />

      <div className="grid grid-cols-2 gap-6">
        <WeeklyProductivityChart data={stats?.weeklyTrend || []} />
        <CompletionTrendChart data={stats?.completionTrend || []} />
      </div>

      <DailyTasksChart data={stats?.weeklyTrend || []} />

      <div className="grid grid-cols-2 gap-6">
        <Insights stats={stats} />
        <WeeklySummary stats={stats} />
      </div>
    </div>
  );
}