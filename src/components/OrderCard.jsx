import React, { useState, useEffect } from "react";
import orderService from "../appwrite/orderMethod";

function OrderCard({ order, onDelete, deleting, userStatus }) {
  const [cart, setCart] = useState([]); // State to store cart items

  useEffect(() => {
    if (userStatus) {
      // Assuming you have a way to get cart items, update the cart here
      setCart(order.orderItem || []); // Update with the order items if userStatus is true
    }
  }, [userStatus, order]);

  const onConform = () => {
    orderService.updateOrder(order.$id, { orderStatus: true });
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-6 space-y-4 bg-white">
      <h3 className="text-xl font-bold text-gray-700">{order.userName}</h3>
      <p className="text-gray-600">Order ID: {order.$id}</p>
      <p className="text-gray-600">Total Price: ₹{order.totalPrice}</p>
      <p className="text-gray-600">Address: {order.orderAddress}</p>

      {/* Display cart if userStatus is true */}
      {userStatus && cart.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700">Cart Items:</h4>
          <div className="space-y-4">
            {cart.map((itemString, index) => {
              const item = JSON.parse(itemString); // Parse stringified item
              return (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="text-gray-700 font-medium">{item.name}</p>
                  </div>
                  <div className="flex justify-between w-1/3 text-gray-600">
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Order Items (Always shown, even if userStatus is false) */}
      <div className="mt-4">
        <h4 className="font-semibold text-gray-700">Order Items:</h4>
        {order.orderItem?.length > 0 ? (
          <div className="space-y-4">
            {order.orderItem.map((itemString, index) => {
              const item = JSON.parse(itemString); // Parse stringified item
              return (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
                >
                  <div className="flex-1">
                    <p className="text-gray-700 font-medium">{item.name}</p>
                  </div>
                  <div className="flex justify-between w-1/3 text-gray-600">
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
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
        <div className="flex space-x-4">
          <button
            className="w-full mt-4 py-2 px-4 rounded transition text-white bg-green-500 hover:bg-green-600"
            onClick={onConform}
          >
            Confirm order
          </button>
          <button
            className={`w-full mt-4 py-2 px-4 rounded transition text-white ${
              deleting === order.$id
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={() => onDelete(order.$id)}
            disabled={deleting === order.$id}
          >
            {deleting === order.$id ? "Deleting..." : "Delete Order"}
          </button>
        </div>
      ) : (
        <>
          <div className="mt-4 text-green-500">Order Delivered....</div>
        </>
      )}
    </div>
  );
}

export default OrderCard;
