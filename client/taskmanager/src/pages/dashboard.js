import React, { useEffect, useState } from "react";
import SidePanel from "../components/sidePanel";
import TaskList from "../components/taskList";
import ApiRequest from "../services/apiServices";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState({ taskNo: "" });
  const [searchResult, setSearchResult] = useState([]);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = async () => {
    const userLogout = await ApiRequest("POST", "user/logout");
    if (userLogout.status.toUpperCase() === "SUCCESS") {
      localStorage.removeItem("theme");
      localStorage.removeItem("userName");
      navigate("/login");
    }
  };

  const searchTask = async () => {
    if (search.taskNo !== "") {
      const searchResult = await ApiRequest("GET", `dashboard/getTask/${search.taskNo}`);
      setSearchResult([searchResult.data]);
    } else {
      const searchResult = await ApiRequest("GET", `dashboard/allTask`);
      setSearchResult(searchResult.data);
    }
  };

  const searchKey = (e) => {
    const { name, value } = e.target;
    setSearch((val) => ({ ...val, [name]: value }));
  };

  const AIsuggestion = async () => {
    const response = await ApiRequest('POST', `dashboard/getAISuggestion`);
    if (response.status.toUpperCase() === "SUCCESS") {
      setAiSuggestion(response.data);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 relative">
      {/* Sidebar */}

      <SidePanel setFilter={setFilter} />

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">
          {/* Search Bar Section */}
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search task no"
              onChange={searchKey}
              name="taskNo"
              value={search.taskNo}
              onKeyPress={(e) => e.key === "Enter" && searchTask()}
              className="w-full p-2 pl-10 rounded-lg bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500"
            />
            <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">🔍</span>
          </div>

          <div className="flex items-center gap-4">

            {/* Dark Mode Toggle */}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            {/* Logout Button */}

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Task List */}
        <TaskList filter={filter} searchResult={searchResult} />
      </div>

      <div className="fixed bottom-16 right-6">
        <div className="relative">

          {/* Popup */}
          {showChatPopup && (
            <div className="absolute bottom-14 right-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-lg rounded-lg p-4 w-72">
              <p className="text-sm mb-2">🤖 AI Task Suggestion</p>
              <button
                onClick={AIsuggestion}
                className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition mb-2"
              >
                Get New AI Suggestion
              </button>
              <div className="text-sm whitespace-pre-wrap">
                {aiSuggestion ? aiSuggestion : "No suggestions available."}
              </div>
            </div>
          )}

          {/* Chat Button */}
          
          <button
            onClick={() => setShowChatPopup(!showChatPopup)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition relative"
          >
            💬
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded-lg opacity-0 hover:opacity-100 transition">
              AI Suggestion
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
