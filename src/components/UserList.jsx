import React, { useState, useEffect } from "react";
import userService from "../appwrite/userMethod";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUser();
        if (response && response.documents) {
          setUsers(response.documents);
        } else {
          setError("No users found.");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin ml-4" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-medium text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        User List
      </h2>
      {users && users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.$id}
              className="border border-gray-300 rounded-lg shadow-md p-6 space-y-4 bg-white"
            >
              <h3 className="text-xl font-bold text-gray-700">{user.name}</h3>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Address: {user.address}</p>
              <p className="text-gray-600">Password: [Hidden for security]</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">No users available</p>
      )}
    </div>
  );
}

export default UserList;
