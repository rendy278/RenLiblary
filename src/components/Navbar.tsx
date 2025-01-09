import { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import ToogleNightMode from "../components/ToogleNightMode";
import Logo from "./Logo";

const Navbar = ({ handleLogout }: { handleLogout: () => void }) => {
  const [userName, setUserName] = useState<string | null>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="w-full p-4 bg-sky-500 text-white shadow-md">
      <div className="w-full flex justify-between items-center">
        <Logo />
        <div className="relative flex items-center gap-3">
          <ToogleNightMode />
          <button
            onClick={toggleDropdown}
            className="p-2 rounded-full bg-white dark:bg-gray-800 dark:text-white text-sky-500"
          >
            <AiOutlineUser size={24} />
          </button>

          {dropdownOpen && (
            <div className="absolute -right-2 top-14 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="p-4 border-b flex items-center gap-2 text-gray-700">
                <div className="p-2 rounded-full bg-sky-500 text-white">
                  <AiOutlineUser size={20} />
                </div>
                <p className="font-bold">{userName || "User"}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left p-3 text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
