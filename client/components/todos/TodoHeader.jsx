"use client"

export default function TodoHeader({ onAdd }) {
  return (
    <div className="flex justify-between items-center mb-6">

      <div>
        <h1 className="text-2xl font-semibold text-white">
          Tasks
        </h1>
        <p className="text-gray-400 text-sm">
          4 pending · 2 completed
        </p>
      </div>

      <button
        onClick={onAdd}
        className="bg-gray-200 text-black px-4 py-2 rounded-lg flex gap-2 items-center"
      >
        + Add Task
      </button>

    </div>
  )
}