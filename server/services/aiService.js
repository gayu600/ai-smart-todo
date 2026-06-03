// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const breakTaskWithAI = async (task) => {
//   const response = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       {
//         role: "system",
//         content: "You are a productivity assistant. Break tasks into clear actionable subtasks. Return only JSON array."
//       },
//       {
//         role: "user",
//         content: `Break this task into subtasks: ${task}`
//       }
//     ],
//     temperature: 0.5
//   });

//   const result = response.choices[0].message.content;

//   return JSON.parse(result);
// };

export const breakTaskWithAI = async (task) => {
  const lowerTask = task.toLowerCase();

  // Simulate processing delay (real AI jaisa feel)
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (lowerTask.includes("dashboard")) {
    return [
      "Create project structure",
      "Design dashboard layout",
      "Build API endpoints",
      "Connect frontend with backend",
      "Test dashboard features"
    ];
  }

  if (lowerTask.includes("backend")) {
    return [
      "Setup Express server",
      "Configure database connection",
      "Create models",
      "Build REST APIs",
      "Test APIs with Postman"
    ];
  }

  if (lowerTask.includes("frontend")) {
    return [
      "Setup Next.js project",
      "Design UI components",
      "Integrate APIs",
      "Handle state management",
      "Optimize UI performance"
    ];
  }

  // Default generic breakdown
  return [
    `Research about ${task}`,
    `Plan structure for ${task}`,
    `Develop main components`,
    `Testing and debugging`,
    `Deployment`
  ];
};

export const detectPriorityWithAI = async (title, deadline) => {
  if (!deadline) {
    return "Medium";
  }
 
 
  const now = new Date();
  const dueDate = new Date(deadline);

  const diffTime = dueDate - now;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  // Simulate AI delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (diffDays <= 1) return "High";
  if (diffDays <= 3) return "Medium";
  return "Low";
};

export const estimateTimeWithAI = async (title) => {
  const lowerTitle = title.toLowerCase();

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (lowerTitle.includes("build") || lowerTitle.includes("develop")) {
    return 4; // hours
  }

  if (lowerTitle.includes("design")) {
    return 3;
  }

  if (lowerTitle.includes("fix") || lowerTitle.includes("bug")) {
    return 2;
  }

  return 1; // default small task
};
export const generateDailyPlan = (todos) => {
  let currentHour = 9;
  const lunchStart = 13;
  const lunchEnd = 14;

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

 const sorted = [...todos].sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return (b.estimated_time || 1) - (a.estimated_time || 1);
  });

  const schedule = [];

  for (let task of sorted) {
    if (currentHour >= 18) break;

    if (currentHour === lunchStart) {
      currentHour = lunchEnd;
    }

    // 🟢 Default minimum 1 hour
    const duration = task.estimated_time && task.estimated_time > 0
      ? task.estimated_time
      : 1;

    const start = currentHour;
    const end = currentHour + duration;

    if (end > 18) break;

    schedule.push({
      time: `${start}:00 - ${end}:00`,
      task: task.title,
      priority: task.priority
    });

    currentHour = end;
  }

  return schedule;
};
export const suggestTasksByMood = (todos, mood) => {
  const lowerMood = mood.toLowerCase();

  if (lowerMood === "tired") {
    return todos.filter(
      t => 
        (t.priority === "Low" || t.priority === "Medium") &&
        (t.estimated_time || 1) <= 2
    );
  }

  if (lowerMood === "motivated") {
  const highTasks = todos.filter(
    t =>
      t.priority === "High" &&
      (t.estimated_time || 1) >= 1
  );

  if (highTasks.length > 0) {
    return highTasks;
  }

  return todos.filter(
    t => t.priority === "Medium"
  );
}

  // Normal mood default
  return todos.filter(
    t =>
      t.priority === "Medium"
  );
};