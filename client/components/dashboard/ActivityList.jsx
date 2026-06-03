"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ActivityList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/todos/recent-activity`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setActivities(response.data);
    };

    fetchActivity();
  }, []);

  return (
    <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-5">Recent Activity</h3>

      <ul className="space-y-4">
        {activities.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <span
              className={`w-2 h-2 mt-2 rounded-full ${
                item.status === "completed" ? "bg-green-500" : "bg-yellow-500"
              }`}
            ></span>

            <div>
              <p className="text-gray-200">{item.title}</p>
              <p className="text-xs text-gray-500">
                {item.status} · {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}scrollTo