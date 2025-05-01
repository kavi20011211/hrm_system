import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import LoginPage from "./View/login-view";
import Dashboard from "./View/dashboard-view";
import RegisterPage from "./View/register-view";
import JobPost from "./View/job-post-view";
import AdminUserPage from "./View/admin-view";
import ForgotPasswordView from "./View/forgot-password-view";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeSelectionView from "./View/employee-select-view";

function App() {
  return (
    <MantineProvider>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          {/* Standalone routes without layout */}
          <Route path="/forgot-password" element={<ForgotPasswordView />} />
          {/* Routes that use the Layout (Sidebar) */}
          <Route element={<Layout />}>
            {/* Public Routes (accessible with sidebar) */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/job-post" element={<JobPost />} />
              <Route path="/admin-user" element={<AdminUserPage />} />
              <Route path="/employee" element={<EmployeeSelectionView />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
