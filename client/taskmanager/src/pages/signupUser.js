import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiRequest from "../services/apiServices";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    emailId: "",
    mobileNo: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const loginUser = () => navigate("/login");

  const updateUserDetails = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors on input change
  };

  const validateForm = () => {
    let newErrors = {};

    if (!userInfo.userName.trim() || userInfo.userName.length < 3) {
      newErrors.userName = "Username must be at least 3 characters";
    }
    if (!userInfo.emailId.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.emailId)) {
      newErrors.emailId = "Enter a valid email address";
    }
    if (!userInfo.mobileNo.trim() || !/^\d{10}$/.test(userInfo.mobileNo)) {
      newErrors.mobileNo = "Enter a valid 10-digit mobile number";
    }
    if (!userInfo.password.trim() || userInfo.password.length < 6 || !/[0-9]/.test(userInfo.password) || !/[!@#$%^&*]/.test(userInfo.password)) {
      newErrors.password = "Password must be at least 6 characters, include a number and a special character";
    }
    if (!userInfo.confirm_password.trim()) {
      newErrors.confirm_password = "Confirm password is required";
    } else if (userInfo.confirm_password !== userInfo.password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerNewUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userResponse = await ApiRequest("POST", "user/signup", userInfo);
    if (userResponse?.status?.toUpperCase() === "SUCCESS") {
      setTimeout(() => navigate("/login"), 1500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-10 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-600">Sign Up</h2>
        <form onSubmit={registerNewUser} className="mt-6 space-y-5">
          {/* Username */}
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="userName"
              value={userInfo.userName}
              onChange={updateUserDetails}
              placeholder="Enter your Username"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring-blue-200 focus:border-blue-400"
            />
            {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={updateUserDetails}
                placeholder="Enter your First Name"
                className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring-blue-200 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={userInfo.lastName}
                onChange={updateUserDetails}
                placeholder="Enter your Last Name"
                className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring-blue-200 focus:border-blue-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="emailId"
              value={userInfo.emailId}
              onChange={updateUserDetails}
              placeholder="Enter your email id"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring-blue-200 focus:border-blue-400"
            />
            {errors.emailId && <p className="text-red-500 text-sm">{errors.emailId}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              name="mobileNo"
              value={userInfo.mobileNo}
              onChange={updateUserDetails}
              placeholder="Enter your mobile no"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring-blue-200 focus:border-blue-400"
            />
            {errors.mobileNo && <p className="text-red-500 text-sm">{errors.mobileNo}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={userInfo.password}
              onChange={updateUserDetails}
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring-blue-200 focus:border-blue-400 pr-10"
            />
            <span
              className="absolute top-10 right-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              value={userInfo.confirm_password}
              onChange={updateUserDetails}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring-blue-200 focus:border-blue-400 pr-10"
            />
            <span
              className="absolute top-10 right-4 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ?  <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
            {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password}</p>}
          </div>

          <button type="submit" className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
