export default function PersonalInfoCard({ user }) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-1">Personal Information</h3>

      <p className="text-gray-400 text-sm mb-4">
        Your account details
      </p>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400">Full Name</label>

          <input
            readOnly
            className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2"
            value={user?.name || ""}
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Email Address</label>

          <input
            readOnly
            className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-2"
            value={user?.email || ""}
          />
        </div>
      </div>
    </div>
  );
}