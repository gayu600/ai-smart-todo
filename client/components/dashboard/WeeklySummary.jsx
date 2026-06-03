// export default function WeeklySummary(){

//   return(
//     <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">

//       <h3 className="font-semibold mb-4">
//         This Week Summary
//       </h3>

//       <div className="space-y-3 text-gray-300">

//         <p>Tasks Completed: <span className="float-right">36</span></p>
//         <p>Tasks Pending: <span className="float-right">8</span></p>
//         <p>Average Time per Task: <span className="float-right">1.5h</span></p>
//         <p>Total Productive Hours: <span className="float-right">54h</span></p>

//       </div>

//     </div>
//   )
// }

export default function WeeklySummary({ stats }) {
  if (!stats) return null;

  const totalHours =
    Number(stats.completed || 0) * Number(stats.avgEstimatedTime || 0);

  return (
    <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
      <h3 className="font-semibold mb-4">
        This Week Summary
      </h3>

      <div className="space-y-3 text-gray-300">
        <p>
          Tasks Completed:
          <span className="float-right">{stats.completed || 0}</span>
        </p>

        <p>
          Tasks Pending:
          <span className="float-right">{stats.pending || 0}</span>
        </p>

        <p>
          Average Time per Task:
          <span className="float-right">
            {stats.avgEstimatedTime || 0}h
          </span>
        </p>

        <p>
          Total Productive Hours:
          <span className="float-right">
            {totalHours.toFixed(1)}h
          </span>
        </p>
      </div>
    </div>
  );
}