import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../store/itemSlice"; // Adjust path as needed
import authService from "../appwrite/auth";
import userService from "../appwrite/userMethod";
import orderService from "../appwrite/orderMethod";

function UserCart() {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        const allUsers = await userService.getAllUser();

        const currentUserEmail = currentUser.email;
        const allUserDocuments = allUsers.documents;

        const matchedUsersList = allUserDocuments.filter(
          (user) => user.email === currentUserEmail
        );

        setMatchedUsers(matchedUsersList);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  const user = matchedUsers[0];
  const handleIncrease = (id) => {
    dispatch(updateQuantity({ itemId: id, change: 1 }));
  };

  const handleDecrease = (id) => {
    dispatch(updateQuantity({ itemId: id, change: -1 }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = async () => {
    const allOrderItems = cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));
    const orderItem = allOrderItems.map((item) => JSON.stringify(item));

    // Calculate the total price
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Call the order service to add the order to the database
    try {
      await orderService.addOrder({
        userId: user.$id,
        userName: user.name,
        orderItem,
        totalPrice,
      });
      alert("Order successfully placed! Proceeding to checkout.");
    } catch (error) {
      console.error("Error placing the order:", error);
      alert("Failed to place the order.");
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-8">
        {user ? `${user.name}'s Shopping Cart` : "Your Shopping Cart"}
      </h2>

      {cartItems.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.$id}
                className="flex items-center bg-white shadow rounded-lg overflow-hidden p-4 space-x-6"
              >
                <img
                  className="w-20 h-20 object-cover cursor-pointer"
                  src={item.itemImage || "/placeholder.png"}
                  alt={item.name}
                  onClick={() => setSelectedImage(item.itemImage)}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Price: ₹{item.price}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-gray-300"
                      onClick={() => handleDecrease(item.$id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => handleIncrease(item.$id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    onClick={() => handleRemove(item.$id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bill Summary Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Bill Summary</h3>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.$id}
                  className="flex justify-between text-gray-600"
                >
                  <span>{item.name}</span>
                  <span>
                    ₹{item.price} x {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 text-lg font-semibold flex justify-between">
              <span>Total Price:</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty</p>
      )}

      {/* Modal for full image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-4 rounded shadow-lg max-w-xl w-full">
            <button
              className="text-red-500 float-right font-bold text-lg"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image modal"
            >
              X
            </button>
            <img
              src={selectedImage}
              alt="Full view"
              className="w-full h-auto object-contain mt-4"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCart;
