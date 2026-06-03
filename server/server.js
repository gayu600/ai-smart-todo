import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";




dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());



app.use("/api/auth", authRoutes);

app.use("/api/todos", todoRoutes);

app.use("/api/ai", aiRoutes);

// app.use("/api/analytics", analyticsRoutes);


app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.send("Database Connected Successfully 🚀");
  } catch (error) {
    res.status(500).send("Database Connection Failed ❌");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});