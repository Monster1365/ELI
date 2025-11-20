import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth";
import SignUp from "../pages/SignUp"
import Login from "../pages/Login";
import Home from "../pages/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Auth />} />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}