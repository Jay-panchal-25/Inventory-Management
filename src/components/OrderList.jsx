import React, { useState, useEffect, useCallback } from "react";
import orderService from "../appwrite/orderMethod";
import OrderCard from "./OrderCard";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getAllOrder();
        setOrders(response.documents);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const onDelete = useCallback(
    async (id) => {
      setDeleting(id); // Set deleting state
      try {
        await orderService.deleteOrder(id);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.$id !== id)
        );
      } catch (err) {
        console.error("Error deleting order:", err);
        alert("Failed to delete the order. Please try again.");
      } finally {
        setDeleting(null); // Reset deleting state
      }
    },
    [setOrders]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin ml-4" />
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

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Order List
      </h2>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard
              key={order.$id}
              order={order}
              onDelete={onDelete}
              deleting={deleting}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">
          No orders available. Check back later.
        </p>
      )}
    </div>
  );
}

export default OrderList;
