import { useState } from "react";
import { User } from "../types/userType";

interface AddUserProps {
  isModal: boolean;
  setModal: (value: boolean) => void;
  onAddUser: (user: User) => void;
}

const AddUser = ({ isModal, setModal, onAddUser }: AddUserProps) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    bookTitle: "",
    loadDate: "",
    returnDate: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    phone: "",
    bookTitle: "",
    loadDate: "",
    returnDate: "",
  });

  const validateForm = () => {
    const newErrors: typeof errors = {
      name: formData.name ? "" : "Name is required.",
      address: formData.address ? "" : "Address is required.",
      phone: formData.phone ? "" : "Phone is required.",
      bookTitle: formData.bookTitle ? "" : "Book Title is required.",
      loadDate: formData.loadDate ? "" : "Load Date is required.",
      returnDate: formData.returnDate ? "" : "Return Date is required.",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newUser: User = {
      id: Date.now(),
      ...formData,
      phone: parseInt(formData.phone, 10),
    };

    onAddUser(newUser);
    setFormData({
      name: "",
      address: "",
      phone: "",
      bookTitle: "",
      loadDate: "",
      returnDate: "",
    });
    setModal(false);
  };

  return (
    <div>
      {isModal && (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-2"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-2"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
              <input
                type="number"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="border border-gray-300 rounded p-2 w-full mb-2"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
              <input
                type="text"
                placeholder="Book Title"
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

export default AddUser;
