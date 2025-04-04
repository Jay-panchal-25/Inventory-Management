import React, { useEffect, useState } from "react";
import authService from "../appwrite/auth";
import userService from "../appwrite/userMethod";

function UserProfile() {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentUser = await authService.getCurrentUser();
        const allUsers = await userService.getAllUser();

        const currentUserEmail = currentUser.email;
        const allUserDocuments = allUsers.documents;

        const matchedUsersList = allUserDocuments.filter(
          (user) => user.email === currentUserEmail
        );

        setMatchedUsers(matchedUsersList);

        if (matchedUsersList.length > 0) {
          const user = matchedUsersList[0];
          setFormData({
            name: user.name,
            email: user.email,
            address: user.address,
            id: user.$id,
          });
        }
      } catch (error) {
        setError("Error fetching user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.address) {
      setError("Name and Address are required.");
      return;
    }

    try {
      await userService.updateUser(formData.id, formData);
      alert("Profile updated successfully!");
      setIsEditing(false);
      setError(null);
    } catch (error) {
      setError("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin ml-4" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6 transition-all duration-300 ease-in-out transform hover:scale-105">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        User Profile
      </h1>

      {error && (
        <div className="mb-4 text-red-500 text-center">
          <p>{error}</p>
        </div>
      )}

      {matchedUsers.length > 0 ? (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Name:
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              />
            ) : (
              <p className="text-gray-800 bg-gray-100 p-2 rounded-lg">
                {formData.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email:
            </label>
            <p className="text-gray-800 bg-gray-100 p-2 rounded-lg">
              {formData.email}
            </p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Address:
            </label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              />
            ) : (
              <p className="text-gray-800 bg-gray-100 p-2 rounded-lg">
                {formData.address}
              </p>
            )}
          </div>

          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={handleEditClick}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No matching user details found.
        </p>
      )}
    </div>
  );
}

export default UserProfile;
