import React, { useState } from "react";
import authService from "../appwrite/auth";
import userService from "../appwrite/userMethod";

const Signup = ({ onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      await authService.createAccount({ name, email, password });
      await userService.addUser({ name, email, address });
      onSignupSuccess(); // Flip back to login after successful signup
    } catch (err) {
      setError(err?.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <InputField
        id="name"
        label="Full Name"
        value={formData.name}
        onChange={handleChange}
        type="text"
        required
        disabled={isLoading}
      />
      <InputField
        id="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        required
        disabled={isLoading}
      />
      <div className="mb-4 relative">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-8 text-gray-600 focus:outline-none"
          tabIndex={-1}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
      <InputField
        id="address"
        label="Address"
        value={formData.address}
        onChange={handleChange}
        type="text"
        required
        disabled={isLoading}
      />

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

const InputField = ({
  id,
  label,
  value,
  onChange,
  type,
  required,
  disabled,
}) => (
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
      disabled={disabled}
    />
  </div>
);

export default Signup;
