import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginForm";
import "./css/main.css";

import { Toaster } from "react-hot-toast";
import Signup from "./pages/SignupForm";
import EmailSent from "./pages/EmailSent";
import Verification from "./pages/Verification";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";
import FinanceDashboard from "./pages/FinanceDashboard";
import TransactionsAnalytics from "./pages/TransactionAnalytics";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 4000,
          style: {
            background: "#fff",
            color: "#000",
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },

          error: {
            duration: 5000,
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        {/* public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/verify-email/:token" element={<Verification />}></Route>
        <Route path="/verification-sent" element={<EmailSent />}></Route>
        <Route path="/forgot-password" element={<ForgotPass />}></Route>
        <Route path="/reset-password/:token" element={<ResetPass />}></Route>
        {/* private routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoutes>{<Dashboard />}</ProtectedRoutes>}
        />
        <Route
          path="/admin-dashboard"
          element={
            <RoleBasedRoute requiredRole="admin">
              <AdminDashboard />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/finance"
          element={
            <ProtectedRoutes>
              {" "}
              <FinanceDashboard />{" "}
            </ProtectedRoutes>
          }
        />
        <Route path="/transactions" element={<TransactionsAnalytics />} />
        <Route path="*" element={<Navigate to="/login" />} replace></Route>
      </Routes>
    </>
  );
}

export default App;
