import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { isLoggedIn, role } = useSelector((state) => state.auth); // Get the isLoggedIn state from redux store

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            MyInventory
          </Link>
        </div>

        {isLoggedIn ? (
          <nav className="hidden md:flex space-x-6">
            {role === "admin" && (
              <>
                <Link to="/dashboard" className="hover:text-gray-300">
                  Dashboard
                </Link>
                <Link to="/addItem" className="hover:text-gray-300">
                  Add Item
                </Link>
                <Link to="/stock" className="hover:text-gray-300">
                  Stock & Items
                </Link>
                <Link to="/" className="hover:text-gray-300">
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
          </nav>
        ) : (
          <nav className="hidden md:flex space-x-6">
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/signup" className="hover:text-gray-300">
              Signup
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
