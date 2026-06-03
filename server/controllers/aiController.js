import pool from "../config/db.js";
import {
  breakTaskWithAI,
  detectPriorityWithAI,
  generateDailyPlan,
  suggestTasksByMood,
} from "../services/aiService.js";

export const breakTask = async (req, res) => {
  try {
    const { task } = req.body;
    const user_id = req.user.user_id;

    const subtasks = await breakTaskWithAI(task);

    for (let subtask of subtasks) {
      await pool.query(
        "INSERT INTO todos (user_id, title, ai_generated) VALUES (?, ?, ?)",
        [user_id, subtask, true]
      );
    }

    res.json({ message: "AI subtasks created", subtasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI processing failed" });
  }
};
//import { detectPriorityWithAI } from "../services/aiService.js";

export const detectPriority = async (req, res) => {
  try {
    const { title, deadline } = req.body;

    const priority = await detectPriorityWithAI(title, deadline);

    res.json({ priority });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Priority detection failed" });
  }
};
//import { generateDailyPlan } from "../services/aiService.js";


export const planDay = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const [todos] = await pool.query(
      "SELECT * FROM todos WHERE user_id = ? AND status = 'pending'",
      [user_id]
    );

    if (todos.length === 0) {
      return res.json({ message: "No pending tasks to plan" });
    }

    const schedule = generateDailyPlan(todos);
     const highPriorityCount = todos.filter(t => t.priority === "High").length;

    let motivation = "Let's have a productive day!";

    if (highPriorityCount > 0) {
      motivation = `You have ${highPriorityCount} high priority tasks. Start strong 💪`;
    }

    res.json({
      date: new Date().toDateString(),
       motivation,
      schedule
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Planner failed" });
  }
};
//import { suggestTasksByMood } from "../services/aiService.js";

export const suggestByMood = async (req, res) => {
  try {
    const { mood } = req.body;
    const user_id = req.user.user_id;

    const [todos] = await pool.query(
      "SELECT * FROM todos WHERE user_id = ? AND status = 'pending'",
      [user_id]
    );

    if (todos.length === 0) {
      return res.json({ message: "No pending tasks available" });
    }

    const suggestions = suggestTasksByMood(todos, mood);

    res.json({
      mood,
      totalSuggestions: suggestions.length,
      suggestions
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Mood suggestion failed" });
  }
};