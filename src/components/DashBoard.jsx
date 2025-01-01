import React, { useEffect, useState } from "react";
import service from "../appwrite/method";
import orderService from "../appwrite/orderMethod";
import userService from "../appwrite/userMethod";
import { useSelector } from "react-redux"; // Importing the useSelector hook to get the role

const DashBoard = () => {
  const { role } = useSelector((state) => state.auth); // Get the role from Redux state

  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalItems: 0,
    totalOrders: 0,
    totalRevenue: 0,
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

  return (
    <>
      {role === "admin" ? (
        <div className="p-6 bg-gray-50 min-h-screen">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Dashboard
          </h2>

          {/* Display loading spinner or message when data is being fetched */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-medium text-gray-700">
                  Total Users
                </h3>
                <p className="text-3xl font-semibold text-blue-600">
                  {dashboardData.totalUsers}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-medium text-gray-700">
                  Total Items
                </h3>
                <p className="text-3xl font-semibold text-yellow-600">
                  {dashboardData.totalItems}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-medium text-gray-700">
                  Total Orders
                </h3>
                <p className="text-3xl font-semibold text-green-600">
                  {dashboardData.totalOrders}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-medium text-gray-700">
                  Total Delivered Order
                </h3>
                <p className="text-3xl font-semibold text-green-600">
                  {dashboardData.totalOrdersTrue}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-medium text-gray-700">
                  Total Pending Orders
                </h3>
                <p className="text-3xl font-semibold text-red-600">
                  {dashboardData.totalOrdersFalse}
                </p>
              </div>
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
