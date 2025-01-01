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
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const onDelete = (id) => async () => {
    try {
      await orderService.deleteOrder(id);
      setOrders(orders.filter((order) => order.$id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Order List</h2>
      {orders && orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div key={order.$id} className="border rounded p-4 shadow">
              <h3 className="text-lg font-bold">{order.userName}</h3>
              <p>Order ID: {order.$id}</p>
              <p>User ID: {order.userId}</p>
              <p>Total Price: ₹{order.totalPrice}</p>
              <p>Status: {order.orderStatus}</p>

              {/* Displaying the items in the order */}
              <div className="mt-2">
                <h4 className="font-semibold">Order Items:</h4>

                <p>{order.orderItem}</p>
              </div>

              <button className="bg-red-400 mt-2" onClick={onDelete(order.$id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No data found</p>
      )}
    </div>
  );
}

export default OrderList;
