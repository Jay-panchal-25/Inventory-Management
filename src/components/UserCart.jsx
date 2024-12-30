import React, { useState } from "react";
import { useSelector } from "react-redux";

function UserCart() {
  const [selectedImage, setSelectedImage] = useState(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [items, setItems] = useState(cartItems);
  console.log(items);
  // Function to decrease quantity for a specific item

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
      {cartItems.length > 0 ? (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Item</th>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.$id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      className="w-20 h-20 object-cover cursor-pointer"
                      src={item.itemImage}
                      alt={item.name}
                      onClick={() => setSelectedImage(item.itemImage)}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center space-x-4">
                      <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                        -
                      </button>

                      <span className="text-lg font-semibold">
                        {item.quantity}
                      </span>
                      <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                        +
                      </button>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ₹{item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for full image */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded shadow-lg">
                <button
                  className="text-red-500 float-right font-bold text-lg"
                  onClick={() => setSelectedImage(null)}
                >
                  X
                </button>
                <img
                  src={selectedImage}
                  alt="Full view"
                  className="max-w-full max-h-screen object-contain"
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No items in the cart</p>
      )}
    </div>
  );
}

export default UserCart;
