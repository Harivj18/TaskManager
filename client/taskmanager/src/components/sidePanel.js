import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function SidePanel({ setFilter }) {
  const navigate = useNavigate();
  const username = localStorage.getItem('userName');
    
  return (
    <div className="w-64 bg-white dark:bg-gray-800 h-screen p-5 shadow-md flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">TO-DO LIST</h2>

        {/* Add Task Button */}
        <button
          className="w-full bg-purple-600 text-white py-2 rounded-lg mb-4 hover:bg-purple-700"
          onClick={() => navigate("/createTask")}
        >
          Add New Task
        </button>

        {/* Menu List */}
        <ul className="space-y-2">
          <li onClick={() => setFilter("all")} className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
            All Tasks
          </li>
          <li onClick={() => setFilter("Completed")} className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
            Completed Tasks
          </li>
          <li onClick={() => setFilter("uncompleted")} className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
            Uncompleted Tasks
          </li>
        </ul>
      </div>

      {/* User Profile Section */}
      <div className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <FaUserCircle size={30} className="text-gray-600 dark:text-gray-300" />
        <span className="text-gray-900 dark:text-white font-medium">{username}</span>
      </div>
    </div>
  );
}

export default SidePanel;
