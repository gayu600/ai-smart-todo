// "use client"

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid
// } from "recharts"

// const data = [
//   { day: "Mon", value: 65 },
//   { day: "Tue", value: 78 },
//   { day: "Wed", value: 92 },
//   { day: "Thu", value: 80 },
//   { day: "Fri", value: 85 },
//   { day: "Sat", value: 45 },
//   { day: "Sun", value: 30 }
// ]

// export default function WeeklyProductivityChart() {

//   return (
//     <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">

//       {/* Title */}
//       <h3 className="text-white font-semibold">
//         Weekly Productivity Score
//       </h3>

//       {/* Subtitle */}
//       <p className="text-gray-400 text-sm mb-4">
//         Your productivity trends over the week
//       </p>

//       <ResponsiveContainer width="100%" height={250}>

//         <LineChart data={data}>

//           <CartesianGrid
//             stroke="#333"
//             strokeDasharray="3 3"
//           />

//           <XAxis
//             dataKey="day"
//             stroke="#aaa"
//           />

//           <YAxis
//             stroke="#aaa"
//           />

//           <Tooltip
//             contentStyle={{
//               background: "#1a1a1a",
//               border: "1px solid #333",
//               borderRadius: "8px",
//               color: "#fff"
//             }}
//           />

//           <Line
//             type="monotone"
//             dataKey="value"
//             stroke="#d946ef"
//             strokeWidth={3}
//             dot={{ r: 5 }}
//             activeDot={{ r: 7 }}
//           />

//         </LineChart>

//       </ResponsiveContainer>

//     </div>
//   )
// }

"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function WeeklyProductivityChart({ data = [] }) {
  const chartData = data;

  return (
    <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
      <h3 className="text-white font-semibold">
        Weekly Productivity Score
      </h3>

      <p className="text-gray-400 text-sm mb-4">
        Your productivity trends over the week
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid
            stroke="#333"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="day"
            stroke="#aaa"
          />

          <YAxis
            stroke="#aaa"
          />

          <Tooltip
            contentStyle={{
              background: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
              color: "#fff",
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#d946ef"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}