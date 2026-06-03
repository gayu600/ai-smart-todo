import express from "express";

import {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  getAnalytics,
  getMostProductiveDay,
  getWeeklyTrend,
  getRecentActivity,
  getCompletionTrend,
} from "../controllers/todoController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addTodo);
router.get("/", authMiddleware, getTodos);

router.get("/analytics", authMiddleware, getAnalytics);
router.get("/productivity-day", authMiddleware, getMostProductiveDay);
router.get("/weekly-trend", authMiddleware, getWeeklyTrend);
router.get("/recent-activity", authMiddleware, getRecentActivity);
router.get("/completion-trend", authMiddleware, getCompletionTrend);

router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;