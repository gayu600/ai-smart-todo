"use client";

import { useEffect, useState } from "react";

export default function NotificationCard() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);

  useEffect(() => {
    const savedPush = localStorage.getItem("pushNotifications");
    const savedEmail = localStorage.getItem("emailDigest");

    if (savedPush !== null) {
      setPushNotifications(savedPush === "true");
    }

    if (savedEmail !== null) {
      setEmailDigest(savedEmail === "true");
    }
  }, []);

  const handlePushToggle = () => {
    const value = !pushNotifications;

    setPushNotifications(value);

    localStorage.setItem(
      "pushNotifications",
      String(value)
    );
  };

  const handleEmailToggle = () => {
    const value = !emailDigest;

    setEmailDigest(value);

    localStorage.setItem(
      "emailDigest",
      String(value)
    );
  };

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold">
        Notifications
      </h3>

      <p className="text-gray-400 text-sm mb-4">
        Manage your notification preferences
      </p>

      <div className="flex justify-between items-center mb-4">
        <div>
          <p>Push Notifications</p>

          <p className="text-sm text-gray-400">
            Receive push notifications for task updates
          </p>
        </div>

        <input
          type="checkbox"
          checked={pushNotifications}
          onChange={handlePushToggle}
        />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p>Email Digest</p>

          <p className="text-sm text-gray-400">
            Get daily summary of your tasks via email
          </p>
        </div>

        <input
          type="checkbox"
          checked={emailDigest}
          onChange={handleEmailToggle}
        />
      </div>
    </div>
  );
}