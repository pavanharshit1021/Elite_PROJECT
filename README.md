# Task Manager Application

## Overview
This is a React-based Task Manager application that allows users to manage tasks efficiently. It includes features like task creation, editing, deletion, searching, sorting, and categorization. The app also supports theme customization (light/dark mode) and allows users to pick their preferred theme color.

## Features
- Add new tasks with title, description, due date, and priority levels (High, Medium, Low).
- Edit and update tasks.
- Delete tasks.
- Mark tasks as completed.
- Search tasks by keyword.
- Categorize tasks as Upcoming, Overdue, or Completed.
- Sort tasks by priority.
- Theme customization (light/dark mode) and custom theme colors.

## Technologies Used
- React.js
- Axios (for API requests)
- CSS for styling
- Express (for backend server)
- CORS
- Body-parser

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn

### Backend Setup
1. Initialize the backend:
   ```sh
   npm init -y
   ```
2. Install dependencies:
   ```sh
   npm install express cors body-parser
   ```
3. Run the backend server inside `Elite_PROJECT`:
   ```sh
   node server.js
   ```

### Frontend Setup
1. Create the React app:
   ```sh
   npx create-react-app task-manager
   cd task-manager
   ```
2. Install dependencies:
   ```sh
   npm install axios
   ```
3. Start the frontend application inside `task-manager`:
   ```sh
   npm start
   ```
4. The application will run on `http://localhost:3000/`.

## Backend API
This application relies on a backend API for managing tasks. The assumed API endpoints are:
- `GET /tasks` - Fetch all tasks.
- `POST /tasks` - Add a new task.
- `DELETE /tasks/:id` - Delete a task.
- `PUT /tasks/:id` - Update a task.
- `GET /tasks/search?query=xyz` - Search tasks by keyword.

Ensure that the backend server is running on `http://localhost:5000/`.

## Customization
- Modify the theme colors in the `themeColor` state variable in `App.js`.
- Adjust styles in `App.css`.

## License
This project is open-source and available under the MIT License.
