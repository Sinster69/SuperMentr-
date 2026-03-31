const tasks = require("../models/taskModel");

// Get all tasks
exports.getAllTasks = (req, res) => {
  res.json(tasks);
};

// Get task by ID
exports.getTaskById = (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

// Create task
exports.createTask = (req, res) => {
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
};

// Update task
exports.updateTask = (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, completed } = req.body;

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
};

// Delete task
exports.deleteTask = (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully" });
};