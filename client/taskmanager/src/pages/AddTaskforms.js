import React, { useState } from "react";
import ApiRequest from "../services/apiServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTaskForm() {
  const navigate = useNavigate()
  const [taskInfo, setTaskInfo] = useState({
    "taskNo": "",
    "taskTitle": "",
    "taskDescription": "",
    "dueDate": "",
    "priority": "Low",
    "status": "Open",
  })
  const [error, setError] = useState("");

  const cancelTask = () => {
    navigate('/home')
  }

  const updateTaskInfo = (e) => {
    const name = e.target.name;
    let value = e.target.value
    setTaskInfo((currentValue) => { return { ...currentValue, [name]: value } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskInfo.taskTitle.trim()) {
      setError("Task Title is required.");
      return;
    }
    if (!taskInfo.dueDate) {
      setError("Due Date is required.");
      return;
    }

    setError(""); // Clear error if validation passes
    if (error === "") {
      const userId = localStorage.getItem("userId")
      let updatedTaskInfo = {...taskInfo, userId}
      
      const addNewTask = await ApiRequest("POST", 'taskManager/dashboard/addTask', updatedTaskInfo)
      if (addNewTask['status'].toUpperCase() === "SUCCESS") {

        toast.success("Task Added Successfully !!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        toast.error("Unable to add Task Currently!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 w-full max-w-2xl mx-auto transition transform hover:scale-105 duration-300"
      >
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-6 text-center">
          📝 Add New Task
        </h2>

        {/* Task Number & Task Title */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">Task Number </label>
            <input
              type="text"
              name="taskNo"
              value={taskInfo.taskNo}
              readOnly
              onChange={updateTaskInfo}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-200 dark:bg-gray-700 dark:text-white cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">Task Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="taskTitle"
              value={taskInfo.taskTitle}
              onChange={updateTaskInfo}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold">Description </label>
          <textarea name="taskDescription" value={taskInfo.taskDescription}
            onChange={updateTaskInfo}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500"></textarea>
        </div>

        {/* Priority & Due Date */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">Priority</label>
            <select name="priority" value={taskInfo.priority}
              onChange={updateTaskInfo}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">Due Date <span className="text-red-500">*</span> </label>
            <input
              type="date"
              name="dueDate"
              value={taskInfo.dueDate}
              onChange={updateTaskInfo}
              required
              min={new Date().toISOString().split("T")[0]} // Restricts past dates
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Status */}
        <div className="mt-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold">Status </label>
          <select name="status" value={taskInfo.status} onChange={updateTaskInfo}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-3 bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500">
            <option value="Open">Open</option>
            <option value="Pending">Pending</option>
            <option value="InProgress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button onClick={cancelTask} type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300">
            Cancel
          </button>
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTaskForm;
