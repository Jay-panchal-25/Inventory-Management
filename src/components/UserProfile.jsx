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

  console.log(matchedUsers);

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

        console.log("Matched users:", matchedUsersList);

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
        console.error("Error fetching user data:", error);
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

  async function handleSave(id) {
    try {
      await userService.updateUser(id, formData);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to update profile.");
    }
  }

  if (loading) {
    return <p className="text-center text-gray-500">Loading user data...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Matched User Profiles
      </h1>
      {matchedUsers.length > 0 ? (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Name:
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <strong className="text-gray-800">{formData.name}</strong>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email:
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-gray-800">{formData.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Address:
            </label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-gray-800">{formData.address}</p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleEditClick}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
            {isEditing && (
              <button
                onClick={() => handleSave(formData.id)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
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
