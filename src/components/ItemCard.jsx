import React from "react";
import { FaEdit, FaTrashAlt, FaEye, FaShoppingCart } from "react-icons/fa";

import { useSelector } from "react-redux";
import service from "../appwrite/method";
import { Navigate } from "react-router-dom";

function ItemCard({
  $id,
  itemImage,
  name,
  price,
  quantity,
  onUpdate,
  itemId,

  onAddToCart,
}) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const deleteItem = () => {
    service.deleteItem($id).then((status) => {
      if (status) {
        appwriteService.deleteFile(itemImage);
        Navigate("/stock");
      }
    });
  };
  return (
    <>
      {" "}
      <div className="flex justify-center items-center ">
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
            <p className="text-gray-600 mt-2">
              Item Name:{" "}
              <span className="font-semibold text-gray-900">{name}</span>
            </p>
            <p className="text-gray-600 mt-1">
              Price:{" "}
              <span className="font-semibold text-gray-900">₹{price}</span>
            </p>
            <p className="text-gray-600 mt-1">
              Quantity:{" "}
              <span className="font-semibold text-gray-900">{quantity}</span>
            </p>
          </div>

          <div className="flex justify-between items-center p-4 border-t border-gray-200">
            <span
              className="text-blue-500 hover:text-blue-600 cursor-pointer"
              onClick={onUpdate}
              title="Edit Item"
            >
              {" "}
              <FaEdit size={20} />
            </span>
            <span
              className="text-red-500 hover:text-red-600 cursor-pointer"
              onClick={deleteItem}
              title="Delete Item"
            >
              {" "}
              <FaTrashAlt size={20} />
            </span>
          </div>
          {/* Actions section */}
          {/* {isLoggedIn ? (
      <div className="flex justify-between items-center p-4 border-t border-gray-200">
        <span
          className="text-blue-500 hover:text-blue-600 cursor-pointer"
          onClick={onUpdate}
          title="Edit Item"
        >
          <FaEdit size={20} />
        </span>
        <span
          className="text-red-500 hover:text-red-600 cursor-pointer"
          onClick={onDelete}
          title="Delete Item"
        >
          <FaTrashAlt size={20} />
        </span>
      </div>
    ) : (
      <span
        className="text-yellow-500 hover:text-yellow-600 cursor-pointer "
        onClick={onAddToCart}
        title="Add to Cart"
      >
        <div className="mx-4 pb-2">
          <FaShoppingCart size={40} />
        </div>
      </span>
    )} */}
        </div>
      </div>
    </>
  );
}

export default ItemCard;
