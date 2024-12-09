import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import AsideBar from "../components/aside/AsideBar";
import { UserContext } from "../context/UserContext";
import { ToastContainer } from "react-toastify";
import Toast from "../components/toast/Toast";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
  // Context
  const userContext = useContext(UserContext);
  if (!userContext) {
    return null;
  }
  const { user } = userContext;

  return (
    <div className="flex flex-row h-screen">
      <ToastContainer />
      {user && <AsideBar />}
      <div className="flex flex-col h-screen flex-grow">
        <Navigation />
        <div
          className={`${
            user && "pl-0 md:pl-[64px]"
          } bg-primary w-full flex-grow flex`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
