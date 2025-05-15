import React, { useEffect, useState } from "react";
import service from "../appwrite/method";
import { ID } from "appwrite";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ Added for toasts

function AddItem({ item }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: item?.name || "",
    quantity: item?.quantity || "",
    itemImage: null,
    itemImagePreview: item?.itemImage ? service.getFilePreview(item.$id) : null,
    price: item?.price || "",
  });

  const [loading, setLoading] = useState(false);

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
        itemImagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, quantity, itemImage, price } = formData;

    setLoading(true);

    try {
      let imageUrl = item?.itemImage;

      if (itemImage) {
        const uploadedImage = await service.uploadFile(itemImage);
        imageUrl = service.getFilePreview(uploadedImage.$id);

        if (item && item.itemImage) {
          await service.deleteFile(itemImage.name);
        }
      }

      if (item) {
        await service.updateItem(item.$id, {
          name,
          quantity,
          itemImage: imageUrl,
          price,
          itemId: item.itemId,
        });
        toast.success("Item updated successfully!"); // ✅ Toast
      } else {
        await service.addItem({
          name,
          quantity,
          itemImage: imageUrl,
          itemId: ID.unique(),
          price,
        });
        toast.success("Item added successfully!"); // ✅ Toast
        navigate("/stock");
      }

      setFormData({
        name: "",
        quantity: "",
        itemImage: null,
        itemImagePreview: null,
        price: "",
      });
    } catch (error) {
      console.error("Error during form submission:", error.response || error);
      toast.error("Failed to submit the form. Please try again."); // ✅ Toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md sm:p-8 md:mt-10 border-t-4 border-blue-500">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            {item ? "Update Item" : "Add New Item"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="itemImage"
                className="block text-sm font-medium text-gray-700"
              >
                Item Image
              </label>
              <input
                type="file"
                id="itemImage"
                name="itemImage"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {formData.itemImagePreview && (
                <div className="mt-4">
                  <img
                    src={formData.itemImagePreview}
                    alt="Item Preview"
                    className="w-32 h-32 object-cover rounded-md shadow-md"
                  />
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={`w-full sm:w-auto px-6 py-2 text-white rounded-md focus:outline-none ${
                  item
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className=""> Processing...</div>
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
