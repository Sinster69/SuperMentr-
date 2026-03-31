const express = require("express");
const app = express();

app.use(express.json());

// ------------------ DATA ------------------
let tasks = [
  { id: 1, title: "Learn Express", completed: false },
  { id: 2, title: "Build API", completed: false }
];

// ------------------ MIDDLEWARE ------------------
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ------------------ ROUTES ------------------

// ✅ Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// ✅ Get task by ID
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
});

// ✅ Create task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ✅ Update task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, completed } = req.body;

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// ✅ Delete task
app.delete("/tasks/:id", (req, res) => {
  const exists = tasks.some(t => t.id == req.params.id);

  if (!exists) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks = tasks.filter(t => t.id != req.params.id);

  res.json({ message: "Task deleted successfully" });
});

// ------------------ SERVER ------------------
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 Task API running on http://localhost:${PORT}`);
});