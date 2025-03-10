# 📝 TaskManager - MERN Stack Application  
TaskManager is an advanced task management application built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). It allows users to efficiently manage tasks with AI-powered suggestions, real-time status updates, and an intuitive user interface.  

---

📋 Dashboard - Task Management
Once logged in, users are redirected to the Home Page (Dashboard) where they can:

✔ Add a New Task - Define task title, description, priority, and due date.
✔ Track Task Status - Tasks can be marked as Completed or Uncompleted.
✔ Modify Completed Status - Users can revert Completed tasks to Incomplete if needed.
✔ Filter Tasks - View All Tasks, Completed Tasks, and Uncompleted Tasks separately.
✔ Search Tasks - Quickly find tasks using the search bar.
✔ AI-Powered Suggestions 🤖 - Get smart recommendations based on task urgency, workload, and priorities.
✔ Dark Mode - Switch between light and dark themes.
✔ Logout - Securely log out from the session.
---

🤖 AI-Powered Task Suggestions
The AI model provides smart recommendations to help users prioritize and manage their tasks efficiently. It analyzes:

Task deadlines
Current workload
Task priority
User activity history
To fetch AI-powered suggestions, the backend calls OpenAI’s API and returns optimized task management recommendations.


## 🚀 Features  

✅ **User Authentication** - Secure signup/login with unique validation for **username, email, and mobile number**.  
✅ **Password Match Validation** - Ensures accurate password confirmation.  
✅ **Task Management** - Create, edit, and track tasks individually.  
✅ **Task Tracking** - Update task **status**, **priority**, and **due date**.  
✅ **Change Completed Status** - Mark completed tasks as **incomplete** if needed.  
✅ **AI-Powered Task Suggestions** 🤖 - Get **smart recommendations** for managing tasks effectively.  
✅ **Dark Mode** - Toggle between light and dark themes.  

---

## 🏗️ Tech Stack  

- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose ODM)  
- **Authentication**: JSON Web Token (JWT)  
- **AI Integration**: OpenAI API (for smart task suggestions)  

---

## 📌 Installation & Setup  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/yourusername/taskmanager.git
cd taskmanager


## 📌 Installation & Setup  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/Harivj18/TaskManager.git
cd taskmanager

2️⃣ Install Dependencies

Backend (Express & MongoDB)

cd backend
npm install --force

Frontend (React.js)

cd ../frontend
npm install

3️⃣ Configure Environment Variables

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Start the Application

Backend Server

cd backend
npm start

Frontend React App

cd frontend
npm start


🔐 User Authentication
Login
If you already have an account, enter your email and password to log in.
If not, click on "Sign up" to create a new account.
Signup
Fill in your username, email, and mobile number (all unique).
Ensure your passwords match before submitting.

🛠️ API Endpoints
Method	Endpoint	Description
POST	/api/user/signup	Register a new user
POST	/api/user/login	Authenticate user
GET	/api/tasks	Fetch all tasks
POST	/api/tasks	Create a new task
PUT	/api/tasks/:id	Update a task
DELETE	/api/tasks/:id	Delete a task


Functionalities
