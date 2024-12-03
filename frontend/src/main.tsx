import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/UserContext";
import "./index.css";
import AppRoutes from "./AppRoutes";
import { ApiProvider } from "./context/ApiContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </ApiProvider>
  </StrictMode>
);
