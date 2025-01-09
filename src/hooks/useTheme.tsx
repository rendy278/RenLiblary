"use client";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  FC,
} from "react";

interface ThemeContextType {
  isNightMode: boolean;
  toggleNightMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isNightMode, setIsNightMode] = useState<boolean>(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("isNightMode");
      if (storedTheme) {
        setIsNightMode(JSON.parse(storedTheme));
      } else {
        document.documentElement.classList.add("dark");
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("isNightMode", JSON.stringify(isNightMode));
      document.documentElement.classList.toggle("dark", isNightMode);
    }
  }, [isNightMode, isMounted]);

  const toggleNightMode = () => {
    setIsNightMode((prevMode) => !prevMode);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isNightMode, toggleNightMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
