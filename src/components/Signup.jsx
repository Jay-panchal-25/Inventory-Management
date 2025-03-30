import React, { useState } from "react";
import authService from "../appwrite/auth";
import userService from "../appwrite/userMethod";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { name, email, password, address } = formData;

    if (!name || !email || !password || !address) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      // Create an account in auth service
      await authService.createAccount({ name, email, password });

      // Add user details to the database
      const userData = await userService.addUser({ name, email, address });

      if (userData) {
        navigate("/login");
      }
    } catch (err) {
      const errorMessage = err?.message || "Failed to create account";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg  w-full sm:w-96">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup}>
          {/** Full Name Input */}
          <InputField
            id="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            required
          />
          {/** Email Input */}
          <InputField
            id="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
          />
          {/** Password Input */}
          <InputField
            id="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          {/** Address Select */}
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <select
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select your address</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Gandhinagar">Gandhinagar</option>
              <option value="Surat">Surat</option>
              <option value="Vadodara">Vadodara</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {/* <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

const InputField = ({ id, label, value, onChange, type, required }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required={required}
    />
  </div>
);

export default SignupPage;
