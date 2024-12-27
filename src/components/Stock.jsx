import React, { useEffect, useState } from "react";
import service from "../appwrite/method";
import ItemCard from "./ItemCard";

function Stock() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // Function to fetch items
  const fetchItems = async () => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    try {
      const result = await service.getAllItems();

      if (result) {
        setItems(result.documents); // Set items if data is fetched successfully
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

  // Delete item locally
  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.$id !== id)); // Remove deleted item from state
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
      </div>
    ); // Show a loading spinner while fetching
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    ); // Show error message if there's an issue
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold pb-4">
        Total Items: {items.length}
      </h2>
      <div className="flex flex-wrap">
        {items.map((item) => (
          // Increment count when a new item is added
          <div key={item.$id} className="p-5">
            <ItemCard item={item} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stock;
