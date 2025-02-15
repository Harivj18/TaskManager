import React, { useState, useEffect, useMemo } from "react";
import Card from "./card";
import ApiRequest from "../services/apiServices";
import { useNavigate } from "react-router-dom";

function TaskList({ filter, searchResult }) {
  const [taskInfo, setTaskInfo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchResult && searchResult.length > 0) {
      setTaskInfo(searchResult);
    } else {
      const fetchTask = async () => {
        const allTask = await ApiRequest("GET", "dashboard/allTask");
        if (allTask.status.toUpperCase() === "SUCCESS") {
          setTaskInfo(allTask.data);
        }
      };
      fetchTask();
    }
  }, [searchResult]);

  const filteredTasks = useMemo(() => {    
    if (taskInfo.length > 0) {
      const processedTasks = taskInfo.map((task) => ({
        ...task,
        dueTime: task.dueDate ? new Date(task.dueDate).getTime() : null,
      }));
      
      if (filter === "all") {
        return processedTasks;
      } else if (filter === "Completed") {
        return processedTasks.filter((task) => task.status === filter);
      } else {
        
        return processedTasks.filter(
          (task) => task.status !== "Completed"
        );
      }
    }  
    return [];
  }, [taskInfo, filter]);
  
  return (
    <div className="flex flex-wrap gap-6 justify-start">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task, index) => <Card key={index} {...task} />)
      ) : (
        <div className="w-full flex flex-col items-start mt-10">
          <p className="text-gray-500 dark:text-gray-400 text-lg font-semibold mb-4">
            No tasks available.
          </p>
          <div
            className="p-6 rounded-2xl shadow-md w-80 h-64 flex flex-col justify-center items-center 
            bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-300 
            dark:hover:bg-gray-700 transition"
            onClick={() => navigate("/createTask")}
          >
            <span className="text-4xl">➕</span>
            <p className="mt-2 font-semibold">Add New Task</p>
          </div>
        </div>
      )}

      {filteredTasks.length > 0 && (
        <div
          className="p-6 rounded-2xl shadow-md w-80 h-64 flex flex-col justify-center items-center 
          bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-gray-300 
          dark:hover:bg-gray-700 transition"
          onClick={() => navigate("/createTask")}
        >
          <span className="text-4xl">➕</span>
          <p className="mt-2 font-semibold">Add New Task</p>
        </div>
      )}
    </div>
  );
}

export default TaskList;
