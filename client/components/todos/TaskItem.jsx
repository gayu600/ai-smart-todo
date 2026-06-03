"use client"

import { Clock } from "lucide-react"

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
const isCompleted = task.status === "completed" || task.completed === true;
  return (
    <div className="bg-[#111] border border-gray-800 p-5 rounded-xl flex justify-between items-center">

      <div className="flex items-center gap-4">

        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`w-6 h-6 flex items-center justify-center rounded-full border
          ${
            isCompleted
              ? "bg-green-600 border-green-600 text-white"
              : "border-gray-500"
          }`}
        >
          {isCompleted && "✓"}
        </button>


        {/* Task Content */}
        <div>

          <h3
            className={`text-lg font-medium ${
              isCompleted
                ? "line-through text-gray-500"
                : "text-white"
            }`}
          >
            {task.title}
          </h3>

          <div className="flex items-center gap-3 mt-1">

            {/* Priority */}
            <span
              className={`text-xs px-2 py-1 rounded-full
              ${
                task.priority === "High"
                  ? "bg-red-900/40 text-red-400"
                  : task.priority === "Medium"
                  ? "bg-yellow-900/40 text-yellow-400"
                  : "bg-green-900/40 text-green-400"
              }`}
            >
              {task.priority}
            </span>

            {/* Time */}
            <span className="flex items-center gap-1 text-gray-400 text-sm">
              <Clock size={14} />
              {task.time}
            </span>

          </div>

        </div>

      </div>


      {/* Actions */}
      <div className="flex gap-4 text-gray-400">

        <button onClick={() => onEdit(task)}>
          ✏️
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="hover:text-red-500"
        >
          🗑
        </button>

      </div>

    </div>
  )
}