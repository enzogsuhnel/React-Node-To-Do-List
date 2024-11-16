import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginAuth from "./pages/home/login&register/LoginAuth";
import Register from "./pages/home/login&register/register";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginAuth />}></Route>
        <Route path="/login" element={<LoginAuth />}></Route>
        {/* { <Route path="*" element={<NotFound />} /> } */}
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<LoginAuth />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
