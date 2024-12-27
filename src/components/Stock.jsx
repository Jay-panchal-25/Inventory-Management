import React, { useEffect, useState } from "react";
import service from "../appwrite/method";
import ItemCard from "./ItemCard";

function Stock() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // Function to fetch items
  const fetchItems = async () => {
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
      setLoading(false); // Set loading to false after fetch
    }
  };

  useEffect(() => {
    fetchItems(); // Fetch items on component mount
  }, []);

  if (loading) {
    return <p>Loading items...</p>; // Show a loading message while fetching
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error message if there's an issue
  }

  return (
    <>
      <h1>Inventory Management</h1>
      <div className="flex flex-wrap">
        {items.map((items) => (
          <div key={items.$id} className="p-5">
            <ItemCard {...items} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Stock;
