import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../services/apiServices";
import { AuthContext } from "../context/authContext";
import Spinner from "../components/spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    emailId: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const { setIsAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [loaderMsg, setLoaderMsg] = useState("Logging In ....");
  const navigate = useNavigate();

  const createAccount = () => {
    navigate("/signup");
  };

  const updateUserDetails = (e) => {
    const { name, value } = e.target;
    setUserInfo((currentValue) => ({ ...currentValue, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!userInfo.emailId.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.emailId)) {
      newErrors.emailId = "Enter a valid email address";
    }
    if (!userInfo.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const userLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const userLoginInfo = await ApiRequest("POST", "taskManager/user/login", userInfo);

    if (userLoginInfo.status.toUpperCase() === "SUCCESS") {
      setIsAuthenticated(true);
      localStorage.setItem('userName', userLoginInfo.userName);
      toast.success("User Login Successfull", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate("/home");
        setLoading(false);
      }, 1000);
    } else {
      toast.error("Invalid email or password!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        setIsAuthenticated(false);
        setLoading(false);
      }, 1000);
    }
  };

  if (loading) {
    return <Spinner loaderMsg={loaderMsg} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-md shadow-2xl bg-white p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-600">Login</h2>
        <form onSubmit={userLogin} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="emailId"
              value={userInfo.emailId}
              onChange={updateUserDetails}
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
            />
            {errors.emailId && <p className="text-red-500 text-sm">{errors.emailId}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={updateUserDetails}
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <button onClick={createAccount} className="text-blue-500 hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
