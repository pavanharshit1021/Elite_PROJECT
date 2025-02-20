import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [theme, setTheme] = useState("light"); // Light or dark theme
  const [themeColor, setThemeColor] = useState("#ff6f61"); // Default theme color

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:5000/tasks");
    setTasks(response.data);
  };

  const addTask = async () => {
    const response = await axios.post("http://localhost:5000/tasks", newTask);
    setTasks([...tasks, response.data]);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "Medium",
    });
    setIsAddTaskOpen(false);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const searchTasks = async () => {
    const response = await axios.get(
      `http://localhost:5000/tasks/search?query=${searchQuery}`
    );
    setTasks(response.data);
  };

  const startEditing = (task) => {
    setEditingTask(task);
  };

  const saveEditedTask = async () => {
    const response = await axios.put(
      `http://localhost:5000/tasks/${editingTask.id}`,
      editingTask
    );
    setTasks(tasks.map((task) => (task.id === editingTask.id ? response.data : task)));
    setEditingTask(null);
  };

  const toggleTaskCompletion = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    const response = await axios.put(
      `http://localhost:5000/tasks/${task.id}`,
      updatedTask
    );
    setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)));
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleThemeColorChange = (color) => {
    setThemeColor(color);
  };

  // Categorize and sort tasks
  const categorizeTasks = () => {
    const now = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(now.getMonth() + 1);

    const categorized = tasks.reduce(
      (acc, task) => {
        if (task.completed) {
          acc.completed.push(task);
        } else if (new Date(task.dueDate) < now) {
          acc.overdue.push(task);
        } else if (new Date(task.dueDate) <= oneMonthFromNow) {
          acc.upcoming.push(task);
        }
        return acc;
      },
      { upcoming: [], overdue: [], completed: [] }
    );

    // Sort tasks by priority
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    categorized.upcoming.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    categorized.overdue.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    categorized.completed.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    return categorized;
  };

  const { upcoming, overdue, completed } = categorizeTasks();

  // Task statistics
  const totalTasks = tasks.length;
  const completedTasks = completed.length;
  const overdueTasks = overdue.length;
  const upcomingTasks = upcoming.length;

  return (
    <div className={`App ${theme}`} style={{ "--theme-color": themeColor }}>
      <header>
        <h1>Task Manager</h1>
        <div className="theme-controls">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
          <select
            className="color-picker"
            value={themeColor}
            onChange={(e) => handleThemeColorChange(e.target.value)}
          >
            <option value="#ff6f61">Red</option>
            <option value="#4caf50">Green</option>
            <option value="#2196f3">Blue</option>
            <option value="#ffeb3b">Yellow</option>
            <option value="#9c27b0">Purple</option>
          </select>
        </div>
      </header>

      <main>
        {/* Task Statistics */}
        <div className="task-statistics">
          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p>{totalTasks}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p>{completedTasks}</p>
          </div>
          <div className="stat-card">
            <h3>Overdue</h3>
            <p>{overdueTasks}</p>
          </div>
          <div className="stat-card">
            <h3>Upcoming</h3>
            <p>{upcomingTasks}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={searchTasks}>Search</button>
        </div>

        {/* Add Task Section */}
        <button
          className="add-task-toggle"
          onClick={() => setIsAddTaskOpen(!isAddTaskOpen)}
        >
          {isAddTaskOpen ? "Close Add Task" : "Add New Task"}
        </button>

        {isAddTaskOpen && (
          <div className="add-task-section">
            <h2>Add Task</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button onClick={addTask}>Add Task</button>
          </div>
        )}

        {/* Tasks Section */}
        <div className="tasks-section">
          <h2>Tasks</h2>

          <div className="task-category">
            <h3>Upcoming Tasks</h3>
            {upcoming.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={startEditing}
                onDelete={deleteTask}
                onToggleCompletion={toggleTaskCompletion}
              />
            ))}
          </div>

          <div className="task-category">
            <h3>Overdue Tasks</h3>
            {overdue.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={startEditing}
                onDelete={deleteTask}
                onToggleCompletion={toggleTaskCompletion}
              />
            ))}
          </div>

          <div className="task-category">
            <h3>Completed Tasks</h3>
            {completed.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={startEditing}
                onDelete={deleteTask}
                onToggleCompletion={toggleTaskCompletion}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="edit-modal">
          <h2>Edit Task</h2>
          <input
            type="text"
            placeholder="Title"
            value={editingTask.title}
            onChange={(e) =>
              setEditingTask({ ...editingTask, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={editingTask.description}
            onChange={(e) =>
              setEditingTask({ ...editingTask, description: e.target.value })
            }
          />
          <input
            type="date"
            value={editingTask.dueDate}
            onChange={(e) =>
              setEditingTask({ ...editingTask, dueDate: e.target.value })
            }
          />
          <select
            value={editingTask.priority}
            onChange={(e) =>
              setEditingTask({ ...editingTask, priority: e.target.value })
            }
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={saveEditedTask}>Save</button>
          <button onClick={() => setEditingTask(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

// TaskCard Component
const TaskCard = ({ task, onEdit, onDelete, onToggleCompletion }) => {
  return (
    <div className="task">
      <span className="edit-icon" onClick={() => onEdit(task)}>
        ✎
      </span>
      <div className="task-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleCompletion(task)}
        />
        <h3>{task.title}</h3>
      </div>
      <p>{task.description}</p>
      <p>Due: {task.dueDate}</p>
      <p>Priority: {task.priority}</p>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default App;