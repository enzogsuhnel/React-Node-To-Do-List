import React from "react";
import Navigation from "../components/navigation/Navigation";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <div className="flex-grow overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
