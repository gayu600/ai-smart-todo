"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TodoHeader from "@/components/todos/TodoHeader";
import TaskList from "@/components/todos/TaskList";
import AddTaskModal from "@/components/todos/AddTaskModal";

import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "@/store/features/todos/todoSlice";

export default function TodosPage() {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.todos.items);
  const loading = useSelector((state) => state.todos.loading);

  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const closeModal = () => {
    setOpen(false);
    setEditingTask(null);
  };

  const handleAddTask = (task) => {
    dispatch(
      addTodo({
        title: task.title,
        description: task.description || "",
        deadline: task.deadline || null,
      })
    );

    closeModal();
  };

  const handleUpdateTask = (task) => {
    dispatch(
      updateTodo({
        id: task.id,
        todoData: {
          title: task.title,
          description: task.description || "",
          deadline: task.deadline || null,
          priority: task.priority ,
          status: task.status || "pending",
        },
      })
    );

    closeModal();
  };

  const handleToggleTask = (id) => {
    const selectedTask = tasks.find((task) => task.id === id);

    if (!selectedTask) return;

    dispatch(
      updateTodo({
        id,
        todoData: {
          status:
            selectedTask.status === "completed" ||
            selectedTask.completed === true
              ? "pending"
              : "completed",
        },
      })
    );
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setOpen(true);
  };

  return (
    <div className="p-8">
      <TodoHeader onAdd={() => setOpen(true)} />

      {loading ? (
        <p className="text-gray-400">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      )}

      <AddTaskModal
        open={open}
        onClose={closeModal}
        onAdd={handleAddTask}
        onUpdate={handleUpdateTask}
        editingTask={editingTask}
      />
    </div>
  );
}