"use client"

import { useState, useEffect } from "react"

export default function AddTaskModal({
  open,
  onClose,
  onAdd,
  onUpdate,
  editingTask
}) {

  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [time, setTime] = useState("")

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "")
setPriority(editingTask.priority || "Medium")
setTime(editingTask.time || editingTask.estimated_time || "")
    } else {
      setTitle("")
      setPriority("Medium")
      setTime("")
    }
  }, [editingTask])

  if (!open) return null

  const handleSubmit = () => {

    if (editingTask) {
      onUpdate({
        ...editingTask,
        title,
        priority,
        time
      })
    } else {
      onAdd({
        id: Date.now(),
        title,
        priority,
        time,
        completed: false
      })
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">

      <div className="bg-[#111] border border-gray-800 p-6 rounded-xl w-[420px]">

        <h2 className="text-lg font-semibold mb-4">
          {editingTask ? "Edit Task" : "Create New Task"}
        </h2>

        <div className="space-y-4">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full bg-gray-800 p-2 rounded"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-gray-800 p-2 rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Estimated time"
            className="w-full bg-gray-800 p-2 rounded"
          />

          <div className="flex justify-end gap-3">

            <button onClick={onClose}>
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="bg-gray-200 text-black px-4 py-2 rounded"
            >
              {editingTask ? "Update Task" : "Add Task"}
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}