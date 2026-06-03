export default function StatCard({ title, value, subtitle, icon, color }) {

  return (
    <div className="bg-[#111] border border-gray-800 p-6 rounded-xl flex justify-between items-start">

      <div>
        <p className="text-gray-400 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2 text-white">
          {value}
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          {subtitle}
        </p>
      </div>

      {/* Icon box */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>

    </div>
  )
}