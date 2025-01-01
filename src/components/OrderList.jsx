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
  });

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">order List</h2>
        {orders && orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <div key={order.$id} className="border rounded p-4 shadow">
                <h3 className="text-lg font-bold">{order.userName}</h3>
                <p>orderId: {order.$id}</p>
                <p>userId: {order.userId}</p>

                <p>totalPrice: {order.totalPrice}</p>
                <p>status: {order.orderStatus}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No data found</p>
        )}
      </div>
    </>
  );
}

export default OrderList;
