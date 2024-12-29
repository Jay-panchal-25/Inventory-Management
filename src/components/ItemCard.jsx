import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import service from "../appwrite/method";
import { Link } from "react-router-dom";
import { addToCart } from "../store/itemSlice";

function ItemCard({ item, onUpdate, onDelete }) {
  const dispatch = useDispatch();
  const { role, isLoggedIn } = useSelector((state) => state.auth);

  const { $id, itemImage, name, price, quantity, itemId } = item;

  // Function to delete item
  const deleteItem = async () => {
    try {
      const status = await service.deleteItem($id);
      if (status) {
        onDelete($id);
      } else {
        alert("Failed to delete the item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("An error occurred while deleting the item.");
    }
  };
  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200 bg-white">
        <div className="w-full h-60">
          <img
            className="w-full h-full object-cover p-3"
            src={itemImage}
            alt={name}
          />
        </div>

        <div className="p-4">
          <h2 className="font-bold text-lg text-gray-800">{name}</h2>
          <p className="text-gray-600 mt-2">Price: ₹{price}</p>
          {role === "admin" ? (
            <p className="text-gray-600 mt-1">Quantity: {quantity}</p>
          ) : null}
        </div>

        <div className="flex justify-between items-center p-4 border-t border-gray-200">
          {role === "admin" ? (
            <>
              <span
                className="text-blue-500 hover:text-blue-600 cursor-pointer"
                title="Edit Item"
              >
                <Link to={`/updateItem/${$id}`}>
                  <FaEdit size={20} />
                </Link>
              </span>
              <span
                className="text-red-500 hover:text-red-600 cursor-pointer"
                onClick={deleteItem}
                title="Delete Item"
              >
                <FaTrashAlt size={20} />
              </span>
            </>
          ) : (
            <button
              className="flex items-center justify-center w-full px-4 py-2 bg-blue-700 text-white rounded shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
              title="Add to Cart"
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="mr-2" size={20} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
