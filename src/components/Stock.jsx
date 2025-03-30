import React, { useEffect, useState } from "react";
import service from "../appwrite/method";
import ItemCard from "./ItemCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Stock() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getAllItems();
      if (result && result.documents) {
        setItems(result.documents);
      } else {
        setError("Failed to fetch items.");
      }
    } catch (err) {
      console.error("Error fetching items:", err);
      setError("An error occurred while fetching items.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.$id !== id));
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchItems();
    }
  }, [isLoggedIn]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      {isLoggedIn && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Total Items: {items.length}
            </h2>
            {role === "admin" && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/addItem")}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                <FaPlus className="mr-2" /> Add Item
              </motion.button>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {items.map((item) => (
              <motion.div
                key={item.$id}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-white shadow-lg  rounded-lg border-t-4 border-blue-500"
              >
                <ItemCard item={item} onDelete={handleDelete} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Stock;
