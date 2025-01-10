import { useRef, useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import ToggleNightMode from "../components/ToogleNightMode";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Navbar = ({ handleLogout }: { handleLogout: () => void }) => {
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    if (storedAccount) {
      const account = JSON.parse(storedAccount);
      setUser({
        userName: account.username,
        userEmail: account.email,
        userPassword: account.password,
      });
    }
  }, []);

  // Handle click outside for user dropdown
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleUserDropdown = () => {
    setUserDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="w-full p-4 bg-sky-500 text-white shadow-md">
      <div className="w-full flex justify-between gap-3 items-center">
        <Logo />
        <div className="relative flex items-center gap-3">
          <ToggleNightMode />
          <button
            onClick={toggleUserDropdown}
            className="p-2 rounded-full bg-white dark:bg-gray-800 dark:text-white text-sky-500"
          >
            <AiOutlineUser size={24} />
          </button>

          {userDropdownOpen && (
            <div
              ref={userDropdownRef}
              className="absolute -right-2 top-14 mt-2 w-fit bg-white rounded-md shadow-lg z-10"
            >
              <div className="p-4 border-b flex items-center gap-2 text-gray-700">
                <div className="p-2 rounded-full bg-sky-500 text-white">
                  <AiOutlineUser size={20} />
                </div>
                <p className="font-bold">{user.userName || "User"}</p>
              </div>
              <div className="p-4 border-b flex flex-wrap flex-col gap-2 text-gray-700">
                <p>Email: {user.userEmail || "Email"}</p>
                <p>Password: {user.userPassword || "Password"}</p>
              </div>
              <button className="w-full text-left p-3 text-sky-500 hover:bg-gray-100">
                <Link to="/settings">Settings</Link>
              </button>
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
