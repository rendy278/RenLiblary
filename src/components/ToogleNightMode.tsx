import { useTheme } from "../hooks/useTheme";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdMoon, IoMdSunny, IoMdSettings } from "react-icons/io";

type ModeType = "system" | "dark" | "light";

const ToggleNightMode = () => {
  const { toggleNightMode } = useTheme();
  const [mode, setMode] = useState<ModeType>("system");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") as ModeType | null;
    setMode(savedMode || "system");
  }, []);

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

    localStorage.setItem("themeMode", mode); // Persist mode
    applyTheme();
  }, [mode]);

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
    if (newMode !== "system") {
      toggleNightMode();
    }
    setIsDropdownOpen(false);
  };

  const getIcon = (mode: ModeType) => {
    switch (mode) {
      case "dark":
        return <IoMdMoon className="text-sky-500" />;
      case "light":
        return <IoMdSunny className="text-yellow-500" />;
      case "system":
        return <IoMdSettings className="text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div ref={dropdownRef} className="relative mx-auto">
      <div
        className="p-2.5 flex items-center justify-between  bg-gray-100 dark:bg-gray-800 w-16 rounded-lg shadow cursor-pointer"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span className="flex items-center gap-2 font-medium text-gray-800 dark:text-gray-200">
          {getIcon(mode)}
        </span>
        <IoIosArrowDown
          className={`w-5 h-5 transform text-gray-800 dark:text-white transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isDropdownOpen && (
        <ul className="absolute left-0 z-10 w-32 mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          {(["system", "dark", "light"] as ModeType[]).map((item) => (
            <li
              key={item}
              onClick={() => handleModeChange(item)}
              className={`flex items-center gap-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer ${
                mode === item
                  ? "font-bold text-sky-500"
                  : "text-gray-800 dark:text-white"
              }`}
            >
              {getIcon(item)}
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToggleNightMode;
