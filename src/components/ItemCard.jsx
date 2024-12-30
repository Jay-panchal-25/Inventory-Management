import React, { useState } from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaShoppingCart,
  FaMinusCircle,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import service from "../appwrite/method";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../store/itemSlice"; // Add the removeFromCart action

function ItemCard({ item, onUpdate, onDelete }) {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false); // Track if item is in the cart

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

  // Function to handle Add to Cart
  const handleAddToCart = async () => {
    setLoading(true);
    try {
      dispatch(addToCart(item)); // Dispatch the addToCart action
      setIsInCart(true); // Mark the item as added to the cart
      setLoading(false);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setLoading(false);
    }
  };

  // Function to handle Remove from Cart
  const handleRemoveFromCart = async () => {
    setLoading(true);
    try {
      dispatch(removeFromCart()); // Dispatch the removeFromCart action
      setIsInCart(false); // Mark the item as removed from the cart
      setLoading(false);
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setLoading(false);
    }
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
              className={`flex items-center justify-center w-full px-4 py-2 ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : isInCart
                  ? "bg-red-700 hover:bg-red-800"
                  : "bg-blue-700 hover:bg-blue-800"
              } text-white rounded shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2`}
              title={isInCart ? "Remove from Cart" : "Add to Cart"}
              onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
              disabled={loading}
            >
              {loading ? (
                <span>{isInCart ? "Removing..." : "Adding..."}</span>
              ) : isInCart ? (
                <>
                  <FaMinusCircle className="mr-1" size={20} />
                  Remove from Cart
                </>
              ) : (
                <>
                  <FaShoppingCart className="mr-2" size={20} />
                  Add to Cart
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
