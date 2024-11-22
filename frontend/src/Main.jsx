import { StrictMode } from "react";
import "./index.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

export default function Main() {
  return (
    <StrictMode>
      <BrowserRouter>
        <UserProvider>
          <Routes />
        </UserProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
