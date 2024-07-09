# Simple Task Manager Application

This is a simple task manager application focusing on functionality with a user-friendly and visually appealing design. The application features an authentication system with Admin and User roles, comprehensive task management capabilities, and a dynamic board for tracking task statuses.

## Features

### 1. Authentication System
- **User Roles:**
  - **Admin:**
    - Add, delete, edit tasks.
    - Assign tasks to users.
    - Manage task statuses.
  - **User:**
    - View tasks assigned to them.
    - Mark tasks as completed.
    - Change task status (cannot delete tasks assigned to them).

### 2. Task Management
- Admin can assign a single task to multiple users.
- Users can:
  - View tasks assigned to them.
  - Mark tasks as completed.
  - Change task status.

### 3. Board for Task Status
- Display tasks with statuses (To-Do, In Progress, Completed).
- Allow users to move tasks across statuses.

## Technologies Used

- **Frontend:** React.js, Tailwind CSS (for styling)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Installation

1. Clone the repository:
git clone <repository-url>

2. Install dependencies:
npm install

3. Set up environment variables:
- Create a `.env` file in the root directory and define variables like `PORT`, `MONGODB_URI`, `JWT_SECRET`, etc.

4. Run the application:
npm run dev

## Usage

- Register as a new user or log in with existing credentials.
- Admins can manage tasks and user roles.
- Users can view assigned tasks, mark them as completed, and update task statuses.

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.