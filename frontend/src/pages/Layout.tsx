import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import AsideBar from "../components/aside/AsideBar";
import { UserContext } from "../context/UserContext";

export default function Layout() {
  // Context
  const userContext = useContext(UserContext);
  if (!userContext) {
    return null;
  }
  const { user } = userContext;

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <div className="flex-grow flex overflow-auto">
        {user && <AsideBar />}
        <div className="ml-4 mr-4 mt-4 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
