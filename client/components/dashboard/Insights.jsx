export default function Insights({ stats }) {
  if (!stats) return null;

  return (
    <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
      <h3 className="font-semibold mb-4">Key Insights</h3>

      <ul className="space-y-4 text-gray-300">
        <li>
          🟢 Most productive day:
          <span className="font-medium ml-2">
            {stats.mostProductiveDay || "N/A"}
          </span>
        </li>

        <li>
          🔵 Productivity Score:
          <span className="font-medium ml-2">
            {stats.productivityScore || 0}%
          </span>
        </li>

        <li>
          🟣 Completed tasks:
          <span className="font-medium ml-2">
            {stats.completed || 0}
          </span>
        </li>
      </ul>
    </div>
  );
}