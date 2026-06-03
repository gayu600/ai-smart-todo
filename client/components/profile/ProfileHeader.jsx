import { User } from "lucide-react";

export default function ProfileHeader({ user }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
        <User size={28} />
      </div>

      <div>
        <h2 className="text-2xl font-semibold">
          {user?.name || "Profile Settings"}
        </h2>

        <p className="text-gray-400 text-sm">
          {user?.email || "Manage your account settings and preferences"}
        </p>
      </div>
    </div>
  );
}