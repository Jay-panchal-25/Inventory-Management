import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            MyInventory
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              {role === "admin" && (
                <>
                  <Link to="/addItem" className="hover:text-gray-300">
                    Add Item
                  </Link>
                  <Link to="/stock" className="hover:text-gray-300">
                    Stock & Items
                  </Link>
                  <Link to="/orderList" className="hover:text-gray-300">
                    Order List
                  </Link>
                  <Link to="/userList" className="hover:text-gray-300">
                    User List
                  </Link>
                </>
              )}
              {role === "user" && (
                <>
                  <Link to="/stock" className="hover:text-gray-300">
                    Item List
                  </Link>
                  <Link to="/userCart" className="hover:text-gray-300">
                    User Cart
                  </Link>
                  <Link to="/userProfile" className="hover:text-gray-300">
                    Profile
                  </Link>
                </>
              )}
              <Link to="/logout" className="hover:text-gray-300">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="hover:text-gray-300">
                Signup
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-700 px-4 py-4 space-y-4">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="block hover:text-gray-300">
                Dashboard
              </Link>
              {role === "admin" && (
                <>
                  <Link to="/addItem" className="block hover:text-gray-300">
                    Add Item
                  </Link>
                  <Link to="/stock" className="block hover:text-gray-300">
                    Stock & Items
                  </Link>
                  <Link to="/orderList" className="block hover:text-gray-300">
                    Order List
                  </Link>
                  <Link to="/userList" className="block hover:text-gray-300">
                    User List
                  </Link>
                </>
              )}
              {role === "user" && (
                <>
                  <Link to="/stock" className="block hover:text-gray-300">
                    Item List
                  </Link>
                  <Link to="/userCart" className="block hover:text-gray-300">
                    User Cart
                  </Link>
                  <Link to="/userProfile" className="block hover:text-gray-300">
                    Profile
                  </Link>
                </>
              )}
              <Link to="/logout" className="block hover:text-gray-300">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="block hover:text-gray-300">
                Signup
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
