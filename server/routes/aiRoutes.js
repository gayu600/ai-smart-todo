import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { breakTask ,detectPriority } from "../controllers/aiController.js";
import { planDay,suggestByMood } from "../controllers/aiController.js";
const router = express.Router();

router.post("/break-task", authMiddleware, breakTask);
router.post("/detect-priority", authMiddleware, detectPriority);

router.post("/plan-day", authMiddleware, planDay);
router.post("/suggest-by-mood", authMiddleware, suggestByMood);
export default router;