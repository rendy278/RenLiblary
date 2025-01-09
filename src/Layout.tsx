import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import App from "./page";
import ProtectedRoute from "./middleware/ProtectedRoute";
import { ThemeProvider } from "./hooks/useTheme";

const MainLayout = ({ handleLogout }: { handleLogout: () => void }) => (
  <>
    <Navbar handleLogout={handleLogout} />
    <Outlet />
    <Footer />
  </>
);

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<App />} />
        </Route>

        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="*"
          element={
            <div className="h-screen flex items-center justify-center">
              <h1>404 - Halaman Tidak Ditemukan</h1>
              <p>Halaman yang Anda cari tidak tersedia.</p>
            </div>
          }
        />
      </Route>
    )
  );

  return (
    <ThemeProvider>
      <div className="dark:text-white dark:bg-gray-800">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
