export default function AccountStatsCard({ stats }) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold">Account Statistics</h3>

      <p className="text-gray-400 text-sm mb-4">
        Your activity overview
      </p>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Total Tasks Created</span>
          <span>{stats?.total || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Tasks Completed</span>
          <span>{stats?.completed || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Tasks Pending</span>
          <span>{stats?.pending || 0}</span>
        </div>

        <div className="flex justify-between">
          <span>Productivity Score</span>
          <span>{stats?.productivityScore || 0}%</span>
        </div>
      </div>
    </div>
  );
}