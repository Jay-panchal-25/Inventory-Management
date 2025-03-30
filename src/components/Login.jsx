import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import Signup from "./Signup";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(authLogin({ email, password }));
      await authService.login({ email, password });
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <motion.div
        className="relative w-full sm:w-[400px] h-[500px]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Login Card */}
        <div
          className="absolute w-full bg-white p-8 rounded-2xl shadow-md flex flex-col justify-center backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Login
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <span className="px-3 text-gray-500">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="mb-6 relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <span className="px-3 text-gray-500">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 text-gray-500 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have an account?
              <span
                onClick={() => setIsFlipped(true)}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>

        {/* Signup Card */}
        <div
          className="absolute w-full h-full bg-white p-8 rounded-2xl shadow-md flex flex-col justify-center backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Sign Up
          </h2>
          <Signup />
          <div className="text-center mt-4">
            <p className="text-sm">
              If you have an account?
              <span
                onClick={() => setIsFlipped(false)}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
