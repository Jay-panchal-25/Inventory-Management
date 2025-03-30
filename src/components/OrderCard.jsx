import React, { useState, useEffect } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineDelete,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FiPackage, FiMapPin } from "react-icons/fi";
import orderService from "../appwrite/orderMethod";

function OrderCard({ order, onDelete, deleting, userStatus }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (userStatus) {
      setCart(order.orderItem || []);
    }
  }, [userStatus, order]);

  const onConfirm = () => {
    orderService.updateOrder(order.$id, { orderStatus: true });
  };

  return (
    <div className="border border-gray-200 rounded-2xl shadow-lg p-6 bg-white transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <FiPackage className="text-blue-500 text-2xl" /> {order.userName}
      </h3>
      <p className="text-gray-600 flex items-center gap-2">
        <AiOutlineShoppingCart className="text-gray-500 text-lg" /> Order ID:{" "}
        {order.$id}
      </p>
      <p className="text-gray-600 flex items-center gap-2">
        <FiMapPin className="text-red-500 text-lg" /> Address:{" "}
        {order.orderAddress}
      </p>
      <p className="text-gray-700 font-semibold text-lg">
        Total Price: ₹{order.totalPrice}
      </p>

      {userStatus && cart.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700">Cart Items:</h4>
          <div className="space-y-3">
            {cart.map((itemString, index) => {
              const item = JSON.parse(itemString);
              return (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 border border-gray-200 rounded-lg bg-gray-50 transition-transform duration-300 hover:scale-105"
                >
                  <p className="text-gray-700 font-medium">{item.name}</p>
                  <div className="text-gray-600 flex gap-4">
                    <p>Qty: {item.quantity}</p>
                    <p>₹{item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-4">
        <h4 className="font-semibold text-gray-700">Order Items:</h4>
        {order.orderItem?.length > 0 ? (
          <div className="space-y-3">
            {order.orderItem.map((itemString, index) => {
              const item = JSON.parse(itemString);
              return (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 border border-gray-200 rounded-lg bg-gray-50 transition-transform duration-300 hover:scale-105"
                >
                  <p className="text-gray-700 font-medium">{item.name}</p>
                  <div className="text-gray-600 flex gap-4">
                    <p>Qty: {item.quantity}</p>
                    <p>₹{item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600">No items found</p>
        )}
      </div>

      {!order.orderStatus ? (
        <div className="flex space-x-4 mt-4">
          <button
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-white bg-green-500 hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
            onClick={onConfirm}
          >
            <AiOutlineCheckCircle className="text-lg" /> Confirm Order
          </button>
          <button
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-white transition-all duration-300 transform hover:scale-105 ${
              deleting === order.$id
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={() => onDelete(order.$id)}
            disabled={deleting === order.$id}
          >
            <AiOutlineDelete className="text-lg" />{" "}
            {deleting === order.$id ? "Deleting..." : "Delete Order"}
          </button>
        </div>
      ) : (
        <div className="mt-4 text-green-500 font-semibold flex items-center gap-2">
          <AiOutlineCheckCircle className="text-green-600 text-xl animate-pulse" />{" "}
          Order Delivered
        </div>
      )}
    </div>
  );
}

export default OrderCard;
