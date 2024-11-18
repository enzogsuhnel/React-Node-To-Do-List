import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./pages/user/Register";
import NotFound from "./pages/notFound/NotFound";
import Profile from "./pages/user/Profile";
import LoginAuth from "./pages/user/LoginAuth";
import Layout from "./pages/Layout";
import Tasks from "./pages/tasks/Tasks";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<LoginAuth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
