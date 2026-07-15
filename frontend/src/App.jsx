import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App({ mode, toggleTheme }) {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/login"
          element={<Login />}
        />
<Route
  path="*"
  element={<NotFound />}
/>
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home
                mode={mode}
                toggleTheme={toggleTheme}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home
                mode={mode}
                toggleTheme={toggleTheme}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History
                mode={mode}
                toggleTheme={toggleTheme}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile
                mode={mode}
                toggleTheme={toggleTheme}
              />
            </ProtectedRoute>
          }
        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

    </BrowserRouter>
  );
}

export default App;