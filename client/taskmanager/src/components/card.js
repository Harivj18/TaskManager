import React, { useState } from "react";
import { FaEdit, FaTrash, FaStar, FaRegStar } from "react-icons/fa";
import ApiRequest from "../services/apiServices";
import { useNavigate } from "react-router-dom";
import { format, isToday, isTomorrow, parseISO, isPast } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Card({ taskNo, taskTitle, taskDescription, dueDate, priority, status, isImportantTask }) {
  const navigate = useNavigate();
  const [isImportant, setIsImportant] = useState(isImportantTask);

  const importantTask = async () => {
    const markImportant = await ApiRequest("POST", "taskManager/dashboard/importantTask", {
      isImportant: !isImportantTask,
      taskNo,
    });
    if (markImportant?.status?.toUpperCase() === "SUCCESS") {
      setIsImportant(!isImportant);
      setTimeout(() => navigate("/home"), 3000);
    }
  };

  const onDeleteTask = async () => {
    await ApiRequest("POST", "taskManager/dashboard/deleteTask", { taskNo });
    setTimeout(() => window.location.reload(), 3000);
  };

  const onEditTask = () => {
    navigate("/updateTask", {
      state: { taskNo, taskTitle, taskDescription, dueDate, priority, status, isImportantTask },
    });
  };

  const dueDateObj = parseISO(dueDate);
  const isDueToday = isToday(dueDateObj);
  const isDueTomorrow = isTomorrow(dueDateObj);
  const isOverdue = isPast(dueDateObj) && !isToday(dueDateObj); 

  const dueText = isOverdue
    ? "❗ Overdue"
    : isDueToday
    ? "⚠️ Due Today"
    : isDueTomorrow
    ? "📅 Due Tomorrow"
    : `🗓 ${format(dueDateObj, "yyyy-MM-dd")}`;

  return (
    <div
      className={`relative p-6 rounded-2xl shadow-lg w-80 h-64 flex flex-col justify-between transition-transform transform hover:scale-105 
        ${
          isOverdue
            ? "bg-red-700 text-white"
            : isDueToday
            ? "bg-red-400 text-white"
            : status === "Completed"
            ? "bg-purple-700 text-white"
            : "bg-white dark:bg-gray-800 dark:text-white text-gray-900"
        }
      `}
    >
      {/* Important Icon */}


      <button
        className="absolute top-3 right-3 text-yellow-500 hover:text-yellow-400 transition"
        onClick={importantTask}
      >
        {isImportant ? <FaStar size={20} /> : <FaRegStar size={20} />}
      </button>


      <div>
        <h3 className="text-xl font-semibold truncate mb-3" title={`Task No: ${taskNo}`}>
          Task No : {taskNo}
        </h3>
        <h3 className="text-lg font-semibold truncate" title={taskTitle}>
          Task Name : {taskTitle}
        </h3>
      </div>


      <p className="text-sm text-gray-600 dark:text-gray-300 h-14 overflow-hidden line-clamp-2">
        {taskDescription}
      </p>


      <div className="flex justify-between items-center text-sm mt-2">
        <span
          className={`text-sm font-medium px-2 py-1 rounded-lg 
            ${
              isOverdue
                ? "bg-red-300 text-white"
                : isDueToday
                ? "bg-red-400 text-white"
                : isDueTomorrow
                ? "bg-yellow-400 text-black"
                : "text-white-600 dark:text-gray-400"
            }
          `}
        >
          {dueText}
        </span>

        <span
          className={`px-3 py-1 rounded-lg text-xs font-semibold 
            ${status === "Completed" ? "bg-green-600 text-white" : "bg-yellow-500 text-black"}
          `}
        >
          {status}
        </span>
      </div>

      <div className="flex justify-between items-center mt-3">
        <button
          className={`flex items-center gap-2 ${
            status === "Completed" ? "text-white hover:text-gray-300" : "text-blue-600 hover:text-blue-700"
          }`}
          onClick={onEditTask}
        >
          <FaEdit size={18} />
          <span className="text-sm font-medium">Edit</span>
        </button>
        <button
          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
          onClick={onDeleteTask}
        >
          <FaTrash size={18} />
          <span className="text-sm font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
}

export default Card;
