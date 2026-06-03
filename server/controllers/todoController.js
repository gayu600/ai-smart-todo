import pool from "../config/db.js";
import { detectPriorityWithAI } from "../services/aiService.js";
import { estimateTimeWithAI } from "../services/aiService.js";


 export const addTodo = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const user_id = req.user.user_id;

    // AI priority detection
    const priority = await detectPriorityWithAI(title, deadline);

    // AI Time Estimation
    const estimatedTime = await estimateTimeWithAI(title);

    await pool.query(
      "INSERT INTO todos (user_id, title, description, deadline, priority, estimated_time) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, title, description, deadline, priority, estimatedTime]
    );

    res.status(201).json({ 
      message: "Todo added successfully",
      priorityDetected: priority,
      estimatedTime: `${estimatedTime} hours`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// GET USER TODOS
export const getTodos = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const [todos] = await pool.query(
      "SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC",
      [user_id]
    );

    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// UPDATE TODO
// export const updateTodo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, status, priority } = req.body;
//     const user_id = req.user.user_id;

//     const [result] = await pool.query(
//       "UPDATE todos SET title=?, description=?, status=?, priority=? WHERE id=? AND user_id=?",
//       [title, description, status, priority, id, user_id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(403).json({ message: "Not allowed to update this todo" });
//     }

//     res.json({ message: "Todo updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, deadline,priority } = req.body;
    const user_id = req.user.user_id;

    // First fetch existing todo
    const [[existing]] = await pool.query(
      "SELECT * FROM todos WHERE id = ? AND user_id = ?",
      [id, user_id]
    );

    if (!existing) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const newTitle = title ?? existing.title;
    const newDeadline = deadline ?? existing.deadline;

    // Smart recalculation
   const newPriority =
  priority || await detectPriorityWithAI(newTitle, newDeadline);   const newEstimatedTime = await estimateTimeWithAI(newTitle);

    await pool.query(
      `
      UPDATE todos 
      SET 
        title = ?,
        description = ?,
        status = ?,
        deadline = ?,
        priority = ?,
        estimated_time = ?,
        completed_at = 
          CASE 
            WHEN ? = 'completed' THEN NOW()
            WHEN ? = 'pending' THEN NULL
            ELSE completed_at
          END
      WHERE id = ? AND user_id = ?
      `,
      [
        newTitle,
        description ?? existing.description,
        status ?? existing.status,
        newDeadline,
        newPriority,
        newEstimatedTime,
        status,
        status,
        id,
        user_id
      ]
    );

    res.json({ message: "Todo updated successfully with completed_at logic" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE TODO
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.user_id;

    const [result] = await pool.query(
      "DELETE FROM todos WHERE id=? AND user_id=?",
      [id, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(403).json({ message: "Not allowed to delete this todo" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    // Total
    const [[{ total }]] = await pool.query(
      "SELECT COUNT(*) as total FROM todos WHERE user_id = ?",
      [user_id]
    );

    // Completed
    const [[{ completed }]] = await pool.query(
      "SELECT COUNT(*) as completed FROM todos WHERE user_id = ? AND status = 'completed'",
      [user_id]
    );

    // Pending
    const [[{ pending }]] = await pool.query(
      "SELECT COUNT(*) as pending FROM todos WHERE user_id = ? AND status = 'pending'",
      [user_id]
    );

    // Priority counts
    const [[{ high }]] = await pool.query(
      "SELECT COUNT(*) as high FROM todos WHERE user_id = ? AND priority = 'High'",
      [user_id]
    );

    const [[{ medium }]] = await pool.query(
      "SELECT COUNT(*) as medium FROM todos WHERE user_id = ? AND priority = 'Medium'",
      [user_id]
    );

    const [[{ low }]] = await pool.query(
      "SELECT COUNT(*) as low FROM todos WHERE user_id = ? AND priority = 'Low'",
      [user_id]
    );

    // Average estimated time
    const [[{ avgTime }]] = await pool.query(
      "SELECT AVG(estimated_time) as avgTime FROM todos WHERE user_id = ?",
      [user_id]
    );

    const productivityScore =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    res.json({
      total,
      completed,
      pending,
      highPriority: high,
      mediumPriority: medium,
      lowPriority: low,
      avgEstimatedTime: avgTime ? Number(avgTime).toFixed(2) : 0,
      productivityScore
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Analytics fetch failed" });
  }
};
export const getMostProductiveDay = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const [rows] = await pool.query(
      `
      SELECT 
        DAYNAME(created_at) as day,
        COUNT(*) as count
      FROM todos
      WHERE user_id = ? AND status = 'completed'
      GROUP BY day
      ORDER BY count DESC
      LIMIT 1
      `,
      [user_id]
    );

    if (rows.length === 0) {
      return res.json({
        mostProductiveDay: null,
        completedTasks: 0,
        message: "No completed tasks yet"
      });
    }

    res.json({
      mostProductiveDay: rows[0].day,
      completedTasks: rows[0].count
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to detect productive day" });
  }
};
export const getWeeklyTrend = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const [rows] = await pool.query(
      `
      SELECT 
        DAYNAME(completed_at) as day,
        COUNT(*) as count
      FROM todos
      WHERE user_id = ?
        AND status = 'completed'
        AND completed_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY day
      `,
      [user_id]
    );

    // 🔥 Convert into chart format
    const daysOrder = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

    const map = {
      Monday: "Mon",
      Tuesday: "Tue",
      Wednesday: "Wed",
      Thursday: "Thu",
      Friday: "Fri",
      Saturday: "Sat",
      Sunday: "Sun"
    };

    const formatted = daysOrder.map(day => ({
      day,
      value: 0
    }));

    rows.forEach(r => {
      const shortDay = map[r.day];
      const index = formatted.findIndex(d => d.day === shortDay);
      if (index !== -1) {
        formatted[index].value = r.count;
      }
    });

    res.json(formatted);

  } catch (error) {
    res.status(500).json({ message: "Weekly trend failed" });
  }
};
export const getRecentActivity = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const [activities] = await pool.query(
      `
      SELECT
        id,
        title,
        status,
        created_at
      FROM todos
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 5
      `,
      [user_id]
    );

    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch activity",
    });
  }
};
export const getCompletionTrend = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const [rows] = await pool.query(
      `
      SELECT
        WEEK(created_at, 1) AS week_number,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending
      FROM todos
      WHERE user_id = ?
        AND created_at >= DATE_SUB(NOW(), INTERVAL 28 DAY)
      GROUP BY WEEK(created_at, 1)
      ORDER BY week_number
      `,
      [user_id]
    );

    const formatted = rows.map((row, index) => ({
      week: `Week ${index + 1}`,
      completed: Number(row.completed),
      pending: Number(row.pending),
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Completion trend fetch failed",
    });
  }
};