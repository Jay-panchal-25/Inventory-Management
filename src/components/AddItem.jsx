import React, { useEffect, useState } from "react";
import service from "../appwrite/method";
import { ID } from "appwrite";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddItem({ item }) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: item?.name || "",
    quantity: item?.quantity || "",
    itemImage: null,
    itemImagePreview: item?.itemImage
      ? service.getFilePreview(item.$id) // Preview for existing image
      : null,
    price: item?.price || "",
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        itemImage: file,
        itemImagePreview: URL.createObjectURL(file), // Local preview
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, quantity, itemImage, price } = formData;

    setLoading(true); // Show loader

    try {
      let imageUrl = item?.itemImage; // Use existing URL if no new image

      if (itemImage) {
        console.log("uploading image" + itemImage);

        const uploadedImage = await service.uploadFile(itemImage);
        imageUrl = service.getFilePreview(uploadedImage.$id); // Get file preview URL

        // Delete the old image if the item exists
        if (item && item.itemImage) {
          await service.deleteFile(itemImage.name);
        }
      }

      if (item) {
        // Update an existing item
        await service.updateItem(item.$id, {
          name,
          quantity,
          itemImage: imageUrl, // Save URL in the database
          price,
          itemId: item.itemId,
        });
        alert("Item updated successfully!");
      } else {
        // Add a new item
        await service.addItem({
          name,
          quantity,
          itemImage: imageUrl, // Save URL in the database
          itemId: ID.unique(),
          price,
        });
        alert("Item added successfully!");
      }

      // Reset form after successful submission
      setFormData({
        name: "",
        quantity: "",
        itemImage: null,
        itemImagePreview: null,
        price: "",
      });
    } catch (error) {
      console.error("Error during form submission:", error.response || error);
      alert("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
            {item ? "Update Item" : "Add New Item"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Item Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-600"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label
                htmlFor="itemImage"
                className="block text-sm font-medium text-gray-600"
              >
                Item Image
              </label>
              <input
                type="file"
                id="itemImage"
                name="itemImage"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formData.itemImagePreview && (
                <div className="mt-4">
                  <img
                    src={formData.itemImagePreview}
                    alt="Item Preview"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-600"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className={`px-6 py-2 rounded-md text-white focus:outline-none ${
                  item
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={loading} // Disable button during loading
              >
                {loading ? (
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                ) : item ? (
                  "Update Item"
                ) : (
                  "Add Item"
                )}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default AddItem;
