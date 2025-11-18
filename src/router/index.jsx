import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth";
import Login from "../pages/Login";
import Home from "../pages/Home";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Auth />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}