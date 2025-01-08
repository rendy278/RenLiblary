import { useTheme } from "../hooks/useTheme";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";

type ModeType = "system" | "dark" | "light";

const ToggleNightMode = () => {
  const { toggleNightMode } = useTheme();
  const [mode, setMode] = useState<ModeType>(() => {
    // Initialize mode from localStorage or default to "system"
    return (localStorage.getItem("themeMode") as ModeType) || "system";
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update theme mode and persist in localStorage
  useEffect(() => {
    const applyTheme = () => {
      if (mode === "system") {
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        document.documentElement.classList.toggle("dark", systemPrefersDark);
      } else {
        document.documentElement.classList.toggle("dark", mode === "dark");
      }
    };

    localStorage.setItem("themeMode", mode); // Persist the mode
    applyTheme();
  }, [mode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Handle mode change
  const handleModeChange = (newMode: ModeType) => {
    setMode(newMode);
    if (newMode !== "system") {
      toggleNightMode();
    }
    setIsDropdownOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-32 mx-auto">
      {/* Dropdown Button */}
      <div
        className="p-2.5 bg-gray-100 dark:bg-gray-800 w-full rounded-lg shadow cursor-pointer"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </span>
          <IoIosArrowDown
            className={`w-5 h-5 transform text-gray-800 dark:text-white transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown List */}
      {isDropdownOpen && (
        <ul className="absolute left-0 z-10 w-full mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          {["system", "dark", "light"].map((item) => (
            <li
              key={item}
              onClick={() => handleModeChange(item as ModeType)}
              className={`p-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer ${
                mode === item
                  ? "font-bold text-sky-500"
                  : "text-gray-800 dark:text-white"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToggleNightMode;
