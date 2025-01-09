import { FaMoon, FaSun } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useTheme } from "../hooks/useTheme";
import { useState, useEffect, useRef } from "react";
import { GrSystem } from "react-icons/gr";

// Define your mode options with icons
const modeOptions = [
  { mode: "system", label: "System", icon: <GrSystem /> },
  {
    mode: "dark",
    label: "Dark",
    icon: <FaMoon className="text-gray-500 dark:text-white" />,
  },
  {
    mode: "light",
    label: "Light",
    icon: <FaSun className="text-yellow-500 dark:text-yellow-300" />,
  },
];

type ModeType = "system" | "dark" | "light";

const ToggleNightMode = () => {
  const { isNightMode, toggleNightMode } = useTheme();
  const [mode, setMode] = useState<ModeType>(() => {
    const savedMode = localStorage.getItem("themeMode") as ModeType;
    return savedMode || "system";
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);

    if (mode === "system") {
      const isSystemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (isSystemDark) {
        if (!isNightMode) toggleNightMode();
      } else {
        if (isNightMode) toggleNightMode();
      }
    } else if (mode === "dark" && !isNightMode) {
      toggleNightMode();
    } else if (mode === "light" && isNightMode) {
      toggleNightMode();
    }
  }, [mode, isNightMode, toggleNightMode]);

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

  const handleModeChange = (newMode: ModeType) => {
    setMode(newMode);
    setIsDropdownOpen(false);
  };

  const selectedOption = modeOptions.find((option) => option.mode === mode);

  return (
    <div ref={dropdownRef} className="relative w-32 mx-auto">
      <div
        className="p-2.5 bg-gray-100 dark:bg-gray-800 w-full rounded-lg shadow cursor-pointer focus:outline-none"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-800 dark:text-gray-200 flex items-center space-x-2">
            {selectedOption?.icon}
            <span>{selectedOption?.label}</span>
          </span>
          <IoIosArrowDown
            className={`w-5 h-5 transform text-gray-800 dark:text-white transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isDropdownOpen && (
        <ul className="absolute left-0 z-10 w-full mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          {modeOptions.map(({ mode: optionMode, label, icon }) => (
            <li
              key={optionMode}
              onClick={() => handleModeChange(optionMode as ModeType)}
              className={`p-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer ${
                mode === optionMode
                  ? "font-bold text-sky-500" // Active item style
                  : "text-gray-800 dark:text-white"
              } ${mode === optionMode ? "pointer-events-none" : ""}`} // Disable click on active item
            >
              <div className="flex items-center space-x-2">
                {icon}
                <span>{label}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToggleNightMode;
