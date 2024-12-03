import React, { createContext, ReactNode, useState } from "react";
import api from "../services/api.js";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

interface UserContextType {
  user: string | null;
  loginUser: (user: UserLogin) => any;
  logoutUser: () => void;
  getUser: () => string | null;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [menuOpen, setMenuOpen] = useState(false)
  const [activeRoute, setActiveRoute] = useState("/")

  const loginUser = async (userData: UserLogin) => {
    try {
      const response = await api.post("/user/auth/login/", userData);
      sessionStorage.setItem("user", JSON.stringify(response.data));
      setUser(userData);
      return response
    } catch (error: any) {
      const errorMessage = error.response.data?.message || "Erro desconhecido.";
      return Promise.reject(new Error(errorMessage));
    }
  };

  const logoutUser = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  const getUser = () => user;

  return (
    <UserContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        getUser,
        activeRoute,
        setActiveRoute,
        menuOpen,
        setMenuOpen
      }}>
      {children}
    </UserContext.Provider>
  );
};
