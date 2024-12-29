import React from "react";
import userService from "../appwrite/userMethod";
import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUser();
        setUsers(response.documents);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
        setLoading(false);
      }
    };

    fetchUsers();
  });

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">User List</h2>
        {users && users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div key={user.$id} className="border rounded p-4 shadow">
                <h3 className="text-lg font-bold">{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Password: {user.password}</p>
                <p>Address: {user.address}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No data found</p>
        )}
      </div>
    </>
  );
}

export default UserList;
