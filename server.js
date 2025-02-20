const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [
  {
    id: 1,
    title: "Complete project report",
    description: "Write and submit the final project report.",
    dueDate: "2023-12-01",
    priority: "High",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Buy groceries",
    description: "Milk, eggs, bread, and vegetables.",
    dueDate: "2023-11-15",
    priority: "Medium",
    status: "Overdue",
  },
];

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
  const newTask = { id: tasks.length + 1, ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, ...updatedTask } : task
  );
  res.json(tasks.find((task) => task.id === taskId));
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.status(204).send();
});

// Search tasks
app.get("/tasks/search", (req, res) => {
  const query = req.query.query.toLowerCase();
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
  );
  res.json(filteredTasks);
});

// Filter tasks by priority and status
app.get("/tasks/filter", (req, res) => {
  const { priority, status } = req.query;
  let filteredTasks = tasks;

  if (priority) {
    filteredTasks = filteredTasks.filter((task) => task.priority === priority);
  }
  if (status) {
    filteredTasks = filteredTasks.filter((task) => task.status === status);
  }

  res.json(filteredTasks);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});