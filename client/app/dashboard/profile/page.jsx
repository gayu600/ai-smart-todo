"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileHeader from "@/components/profile/ProfileHeader";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import NotificationCard from "@/components/profile/NotificationCard";
import AppearanceCard from "@/components/profile/AppearanceCard";
import SecurityCard from "@/components/profile/SecurityCard";
import AccountStatsCard from "@/components/profile/AccountStatsCard";

import { fetchAnalytics } from "@/store/features/analytics/analyticsSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { stats } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  return (
    <div className="p-8 space-y-8">
      <ProfileHeader user={user} />

      <PersonalInfoCard user={user} />

      <NotificationCard />

      <AppearanceCard />

      <SecurityCard />

      <AccountStatsCard stats={stats} />
    </div>
  );
}