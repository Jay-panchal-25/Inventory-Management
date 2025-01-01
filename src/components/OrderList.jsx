import React, { useState, useEffect } from "react";
import orderService from "../appwrite/orderMethod";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getAllOrder();
        setOrders(response.documents);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Add empty dependency array to avoid infinite loop

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-medium">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-medium text-xl">
        {error}
      </div>
    );
  }

  const onDelete = async (id) => {
    try {
      await orderService.deleteOrder(id);
      setOrders(orders.filter((order) => order.$id !== id));
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Order List
      </h2>
      {orders && orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.$id}
              className="border border-gray-300 rounded-lg shadow-md p-6 space-y-4 bg-white"
            >
              <h3 className="text-xl font-bold text-gray-700">
                {order.userName}
              </h3>
              <p className="text-gray-600">Order ID: {order.$id}</p>
              <p className="text-gray-600">User ID: {order.userId}</p>
              <p className="text-gray-600">Total Price: ₹{order.totalPrice}</p>
              <p className="text-gray-600">Status: {order.orderStatus}</p>
              <p className="text-gray-600">Address: {order.orderAddress}</p>

              {/* Displaying the items in the order */}
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700">Order Items:</h4>
                {order.orderItem && order.orderItem.length > 0 ? (
                  <div className="space-y-4">
                    {order.orderItem.map((itemString, index) => {
                      // Parsing the stringified item into an object
                      const item = JSON.parse(itemString);
                      return (
                        <div
                          key={index}
                          className="flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
                        >
                          <div className="flex-1">
                            <p className="text-gray-700 font-medium">
                              {item.name}
                            </p>
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

              <button
                className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                onClick={() => {
                  onDelete(order.$id);
                }}
              >
                Delete Order
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">No orders available</p>
      )}
    </div>
  );
}

export default OrderList;
