import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaBox,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import { logout } from "../store/authSlice/"; // Import logout action

function Header() {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect after logout
  };

  return (
    <header className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-6 flex justify-between items-center py-4">
        {/* Logo with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold flex items-center"
        >
          <FaBox className="mr-2 text-3xl" />
          <Link
            to="/"
            className="hover:text-gray-300 transition-all duration-300"
          >
            Inventory Management System
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-lg">
          {isLoggedIn && (
            <>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1 hover:text-gray-300 transition-all duration-300"
                >
                  <FaClipboardList /> Dashboard
                </Link>
              </motion.div>
              {role === "admin" ? (
                <>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Link
                      to="/stock"
                      className="hover:text-gray-300 transition-all duration-300"
                    >
                      Stock & Items
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Link
                      to="/orderList"
                      className="hover:text-gray-300 transition-all duration-300"
                    >
                      Orders
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Link
                      to="/userList"
                      className="hover:text-gray-300 transition-all duration-300"
                    >
                      Users
                    </Link>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Link
                      to="/stock"
                      className="hover:text-gray-300 transition-all duration-300"
                    >
                      Item List
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Link
                      to="/userCart"
                      className="hover:text-gray-300 transition-all duration-300"
                    >
                      Cart
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Link
                      to="/userProfile"
                      className="hover:text-gray-300 transition-all duration-300"
                    >
                      Profile
                    </Link>
                  </motion.div>
                </>
              )}
              <motion.div whileHover={{ scale: 1.1 }}>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 hover:text-gray-300 transition-all duration-300"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </motion.div>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:hidden bg-gray-700 px-6 py-4 space-y-4 text-lg"
        >
          {isLoggedIn && (
            <>
              <Link
                to="/dashboard"
                className="block hover:text-gray-300"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              {role === "admin" ? (
                <>
                  <Link
                    to="/stock"
                    className="block hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    Stock & Items
                  </Link>
                  <Link
                    to="/orderList"
                    className="block hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/userList"
                    className="block hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    Users
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/stock"
                    className="block hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    Item List
                  </Link>
                  <Link
                    to="/userCart"
                    className="block hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    Cart
                  </Link>
                  <Link
                    to="/userProfile"
                    className="block hover:text-gray-300"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className=" hover:text-gray-300 flex items-center gap-1"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </motion.nav>
      )}
    </header>
  );
}

export default Header;
