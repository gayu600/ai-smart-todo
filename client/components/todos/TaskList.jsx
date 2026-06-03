import TaskItem from "./TaskItem"

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {

  return (
    <div className="space-y-4">

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}

    </div>
  )
}