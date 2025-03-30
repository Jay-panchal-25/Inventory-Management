import React, { useState, useEffect, useCallback } from "react";
import {
  AiOutlineLoading3Quarters,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { motion } from "framer-motion";
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
      setDeleting(id);
      try {
        await orderService.deleteOrder(id);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.$id !== id)
        );
      } catch (err) {
        console.error("Error deleting order:", err);
        alert("Failed to delete the order. Please try again.");
      } finally {
        setDeleting(null);
      }
    },
    [setOrders]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AiOutlineLoading3Quarters className="w-16 h-16 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center h-screen text-red-500 font-medium text-xl flex-col"
      >
        <AiOutlineExclamationCircle className="text-4xl mb-2" />
        {error}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <motion.h2
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-semibold mb-6 text-center text-gray-800 transition-transform duration-300 hover:scale-105"
      >
        Order List
      </motion.h2>
      {orders.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {orders.map((order, index) => (
            <motion.div
              key={order.$id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <OrderCard
                order={order}
                onDelete={onDelete}
                deleting={deleting}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-center text-lg text-gray-600"
        >
          No orders available. Check back later.
        </motion.p>
      )}
    </motion.div>
  );
}

export default OrderList;
