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
import { addToCart, removeFromCart } from "../store/itemSlice";

function ItemCard({ item, onUpdate, onDelete }) {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const { $id, itemImage, name, price, quantity } = item;

  // Function to handle item deletion
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

  // Function to handle cart actions
  const handleCartAction = (action) => {
    setLoading(true);
    try {
      if (action === "add") {
        dispatch(addToCart(item));
        setIsInCart(true);
      } else if (action === "remove") {
        dispatch(removeFromCart(item.$id));
        setIsInCart(false);
      }
    } catch (error) {
      console.error(
        `Error ${action === "add" ? "adding to" : "removing from"} cart:`,
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-sm rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white">
        {/* Item Image */}
        <div className="w-full h-60">
          <img
            className="w-full h-full object-cover p-2"
            src={itemImage}
            alt={name}
          />
        </div>

        {/* Item Details */}
        <div className="p-4">
          <h2 className="font-bold text-xl text-gray-800">{name}</h2>
          <p className="text-gray-600 mt-2">Price: ₹{price}</p>
          {role === "admin" && (
            <p className="text-gray-600 mt-1">Quantity: {quantity}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200">
          {role === "admin" ? (
            <>
              <Link
                to={`/updateItem/${$id}`}
                className="text-blue-500 hover:text-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded"
                title="Edit Item"
                aria-label="Edit Item"
              >
                <FaEdit size={20} />
              </Link>
              <button
                className="text-red-500 hover:text-red-600 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 rounded"
                onClick={deleteItem}
                title="Delete Item"
                aria-label="Delete Item"
              >
                <FaTrashAlt size={20} />
              </button>
            </>
          ) : (
            <button
              className={`flex items-center justify-center w-full px-4 py-2 text-white rounded-md shadow-lg transition focus:outline-none ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : isInCart
                  ? "bg-red-700 hover:bg-red-800 focus:ring-red-400"
                  : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-400"
              }`}
              title={isInCart ? "Remove from Cart" : "Add to Cart"}
              aria-label={isInCart ? "Remove from Cart" : "Add to Cart"}
              onClick={() => handleCartAction(isInCart ? "remove" : "add")}
              disabled={loading}
            >
              {loading ? (
                <span>{isInCart ? "Removing..." : "Adding..."}</span>
              ) : isInCart ? (
                <>
                  <FaMinusCircle className="mr-2" size={20} />
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
