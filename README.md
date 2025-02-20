Task Manager App

Overview

This is a simple React-based task management application that allows users to add, edit, delete, and search tasks. The app provides categorization based on task priority and due dates while offering a dark/light mode and customizable theme colors.

Features

Add new tasks with title, description, due date, and priority.

Edit existing tasks.

Delete tasks.

Search tasks by title or description.

Mark tasks as completed or pending.

Categorize tasks as upcoming, overdue, or completed.

Sort tasks based on priority.

Dark mode and light mode toggle.

Customizable theme colors.

Technologies Used

React.js

Axios (for API requests)

CSS for styling

Installation

Prerequisites

Ensure you have the following installed:

Node.js

npm (comes with Node.js) or yarn

Steps

Clone the repository:

git clone https://github.com/your-username/task-manager.git
cd task-manager

Install dependencies:

npm install

Start the development server:

npm start

The app will be available at http://localhost:3000/.

Backend API

The app expects a backend running at http://localhost:5000/. Ensure you have a RESTful API set up with the following endpoints:

GET /tasks - Fetch all tasks

POST /tasks - Create a new task

DELETE /tasks/:id - Delete a task

PUT /tasks/:id - Update a task

GET /tasks/search?query=keyword - Search tasks

Customization

Theme Colors: You can choose from predefined theme colors.

Dark Mode: Toggle between light and dark mode.

Future Improvements

Add user authentication.

Implement drag-and-drop task sorting.

Add notifications/reminders.
