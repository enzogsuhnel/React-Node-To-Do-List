import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Tasks from "./pages/tasks/Tasks";
import Login from "./pages/user/Login";
import NotFound from "./pages/notFound/NotFound";
import Register from "./pages/user/Register";
import Profile from "./pages/user/Profile";
import { UserContext } from "./context/UserContext";

export default function AppRoutes() {
  // Context
  const userContext = useContext(UserContext);
  if (!userContext) {
    return null;
  }
  const { getUser } = userContext;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {!getUser() ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Tasks />} />
              <Route path="/task-list" element={<Tasks />} />
            </>
          )}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
