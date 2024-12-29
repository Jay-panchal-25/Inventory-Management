import React, { useEffect, useState } from "react";
import service from "../appwrite/method";
import ItemCard from "./ItemCard";
import { useSelector } from "react-redux";

function Stock() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getAllItems();

      if (result) {
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

  // Delete item locally
  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.$id !== id));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="p-4">
          <h2 className="text-xl font-semibold pb-4">
            Total Items: {items.length}
          </h2>
          <div className="flex flex-wrap">
            {items.map((item) => (
              <div key={item.$id} className="p-5">
                <ItemCard item={item} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Stock;
