import React, { useEffect, useState } from "react";
import service from "../appwrite/method";
import orderService from "../appwrite/orderMethod";
import userService from "../appwrite/userMethod";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";

const DashBoard = () => {
  const { role } = useSelector((state) => state.auth);

  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalItems: 0,
    totalOrders: 0,
    totalOrdersTrue: 0,
    totalOrdersFalse: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalUsers = await userService.getAllUser();
        const totalItems = await service.getAllItems();
        const totalOrders = await orderService.getAllOrder();

        let totalOrdersTrue = 0;
        let totalOrdersFalse = 0;
        totalOrders.documents.forEach((order) => {
          if (order.orderStatus === true) {
            totalOrdersTrue++;
          } else if (order.orderStatus === false) {
            totalOrdersFalse++;
          }
        });

        setDashboardData({
          totalUsers: totalUsers.total,
          totalItems: totalItems.total,
          totalOrders: totalOrders.total,
          totalOrdersTrue: totalOrdersTrue,
          totalOrdersFalse: totalOrdersFalse,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cardData = [
    {
      title: "Total Users",
      value: dashboardData.totalUsers,
      color: "border-blue-600",
      icon: <FaUsers className="text-blue-600 text-4xl" />,
    },
    {
      title: "Total Items",
      value: dashboardData.totalItems,
      color: "border-yellow-600",
      icon: <FaBox className="text-yellow-600 text-4xl" />,
    },
    {
      title: "Total Orders",
      value: dashboardData.totalOrders,
      color: "border-green-600",
      icon: <FaShoppingCart className="text-green-600 text-4xl" />,
    },
    {
      title: "Total Delivered Orders",
      value: dashboardData.totalOrdersTrue,
      color: "border-green-500",
      icon: <FaCheckCircle className="text-green-500 text-4xl" />,
    },
    {
      title: "Total Pending Orders",
      value: dashboardData.totalOrdersFalse,
      color: "border-red-600",
      icon: <FaHourglassHalf className="text-red-600 text-4xl" />,
    },
  ];

  return (
    <>
      {role === "admin" ? (
        <div className="p-6 bg-gray-50 min-h-screen">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Dashboard
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cardData.map((card, index) => (
                <motion.div
                  key={index}
                  className={`bg-white p-6 rounded-lg shadow-lg text-center border-t-4 ${card.color}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <div className="mb-4 flex justify-center">{card.icon}</div>
                  <h3 className="text-xl font-medium text-gray-700">
                    {card.title}
                  </h3>
                  <p className="text-3xl font-semibold">{card.value}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="p-6 bg-gray-50 min-h-screen">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Welcome to the Dashboard
          </h2>
        </div>
      )}
    </>
  );
};

export default DashBoard;
