import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/LoginForm";
import "./css/main.css";
import Signup from "./components/SignupForm";
import Dashboard from "./pages/Dashboard";
import Verification from "./components/Verification";
import EmailSent from "./components/EmailSent";
import ForgotPass from "./components/ForgotPass";
import ResetPass from "./components/ResetPass";

function App() {
  return (
    <>
      <Dashboard />
      {/*  <Routes>
        <Route path="/" element={<Navigate to="/login"></Navigate>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
      </Routes> */}
    </>
  );
}

export default App;
