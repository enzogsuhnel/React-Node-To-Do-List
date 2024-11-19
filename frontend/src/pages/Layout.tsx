import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";

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
