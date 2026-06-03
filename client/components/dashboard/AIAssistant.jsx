"use client";

import {
  Sparkles,
  CalendarDays,
  Lightbulb,
  ListChecks,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import {
  planDay,
  suggestMood,
  breakTask,
} from "@/store/features/ai/aiSlice";

export default function AIAssistant() {
  const dispatch = useDispatch();

  const {
    plan,
    suggestions,
    breakResult,
    loading,
  } = useSelector((state) => state.ai);

  const handlePlanDay = () => {
    dispatch(planDay());
  };

  const handleSuggestMood = () => {
    const mood = prompt("Enter your mood: tired, motivated, normal");

    if (!mood) return;

    dispatch(suggestMood(mood));
  };

  const handleBreakTask = () => {
    const task = prompt(
      "Enter a big task (Example: Build Employee Dashboard)"
    );

    if (!task) return;

    dispatch(breakTask(task));
  };

  return (
    <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Sparkles size={16} className="text-white" />
        </div>

        <h3 className="text-lg font-semibold">AI Assistant</h3>
      </div>

      <div className="space-y-4">
        <button
          onClick={handlePlanDay}
          className="w-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition p-4 rounded-lg text-left flex gap-3 items-start shadow-lg"
        >
          <CalendarDays className="text-purple-400 mt-1" size={18} />

          <div>
            <p className="font-medium">Plan My Day</p>
            <p className="text-sm text-gray-400">
              Get AI-powered task suggestions for today
            </p>
          </div>
        </button>

        <button
          onClick={handleSuggestMood}
          className="w-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition p-4 rounded-lg text-left flex gap-3 items-start shadow-lg"
        >
          <Lightbulb className="text-pink-400 mt-1" size={18} />

          <div>
            <p className="font-medium">Suggest Tasks by Mood</p>
            <p className="text-sm text-gray-400">
              Get personalized task recommendations
            </p>
          </div>
        </button>

        <button
          onClick={handleBreakTask}
          className="w-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition p-4 rounded-lg text-left flex gap-3 items-start shadow-lg"
        >
          <ListChecks className="text-cyan-400 mt-1" size={18} />

          <div>
            <p className="font-medium">Break Task Into Subtasks</p>
            <p className="text-sm text-gray-400">
              AI generates smaller actionable tasks
            </p>
          </div>
        </button>
      </div>

      {loading && (
        <p className="text-gray-400 text-sm mt-4">
          AI is thinking...
        </p>
      )}

      {plan?.message && (
        <p className="text-yellow-400 text-sm mt-4">
          {plan.message}
        </p>
      )}

      {plan?.schedule?.length > 0 && (
        <div className="mt-5 bg-black/40 p-4 rounded-lg border border-gray-800">
          <p className="font-medium mb-2">Today Plan</p>

          <p className="text-sm text-purple-300 mb-3">
            {plan.motivation}
          </p>

          <ul className="space-y-2 text-sm text-gray-300">
            {plan.schedule.map((item, index) => (
              <li key={index}>
                {item.time} - {item.task} ({item.priority})
              </li>
            ))}
          </ul>
        </div>
      )}

      {suggestions?.length > 0 && (
        <div className="mt-5 bg-black/40 p-4 rounded-lg border border-gray-800">
          <p className="font-medium mb-2">Mood Based Suggestions</p>

          <ul className="space-y-2 text-sm text-gray-300">
            {suggestions.map((task) => (
              <li key={task.id}>
                {task.title} - {task.priority}
              </li>
            ))}
          </ul>
        </div>
      )}

      {breakResult?.subtasks?.length > 0 && (
        <div className="mt-5 bg-black/40 p-4 rounded-lg border border-gray-800">
          <p className="font-medium mb-2">
            AI Generated Subtasks
          </p>

          <ul className="space-y-2 text-sm text-gray-300">
            {breakResult.subtasks.map((task, index) => (
              <li key={index}>
                ✅ {task}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}