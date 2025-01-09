import { useState } from "react";
import { User } from "../types/userType";

interface EditUserProps {
  isModal: boolean;
  setModal: (value: boolean) => void;
  user: User;
  onEditUser: (user: User) => void;
}

const EditUser = ({ isModal, setModal, user, onEditUser }: EditUserProps) => {
  const [formData, setFormData] = useState({
    name: user.name,
    address: user.address,
    phone: user.phone,
    bookTitle: user.bookTitle,
    loadDate: user.loadDate,
    returnDate: user.returnDate,
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    phone: "",
    bookTitle: "",
    loadDate: "",
    returnDate: "",
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (value.trim() !== "") {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() ? "" : "Name is required",
      address: formData.address.trim() ? "" : "Address is required",
      phone: formData.phone > 0 ? "" : "Phone is required",
      bookTitle: formData.bookTitle.trim() ? "" : "Book title is required",
      loadDate: formData.loadDate ? "" : "Load date is required",
      returnDate: formData.returnDate ? "" : "Return date is required",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedUser: User = {
        ...user,
        ...formData,
      };
      onEditUser(updatedUser);
      setModal(false);
    }
  };

  return (
    <div>
      {isModal && (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-2"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
              <input
                type="number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-2"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
              <input
                type="text"
                value={formData.bookTitle}
                onChange={(e) => handleChange("bookTitle", e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-2"
              />
              {errors.bookTitle && (
                <p className="text-red-500 text-sm">{errors.bookTitle}</p>
              )}
              <label htmlFor="loadDate">Load Date:</label>
              <input
                type="date"
                value={formData.loadDate}
                onChange={(e) => handleChange("loadDate", e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-2"
              />
              {errors.loadDate && (
                <p className="text-red-500 text-sm">{errors.loadDate}</p>
              )}
              <label htmlFor="returnDate">Return Date:</label>
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => handleChange("returnDate", e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-4"
              />
              {errors.returnDate && (
                <p className="text-red-500 text-sm">{errors.returnDate}</p>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
