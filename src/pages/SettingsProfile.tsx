import { useState, useEffect } from "react";
import { getAccount, editAccount } from "../controllers/AccountController";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SettingsProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const account = getAccount();
    setFormData({
      username: account.username,
      email: account.email,
      password: account.password,
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editAccount(formData);
    setMessage("Akun berhasil diperbarui!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="rounded-xl w-full md:w-96 flex flex-col justify-center items-center gap-4 bg-sky-500 shadow-md">
        <div className="bg-red-500 p-4 rounded-t-xl w-full">
          <h1 className="font-bold text-white text-2xl">Account Settings</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full p-4 flex flex-col gap-5"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center text-red-500 px-3 cursor-pointer"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Simpan Perubahan
          </button>
          {message && (
            <div className="mt-4 bg-green-100 p-2 rounded text-green-700 text-center">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SettingsProfile;
