const express = require("express");
const app = express();

app.use(express.json());

// Middleware (optional but good)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// Server
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`🚀 MVC Task API running on http://localhost:${PORT}`);
});