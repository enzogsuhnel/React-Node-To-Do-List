import React, { createContext, ReactNode, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

interface UserContextType {
  user: string | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  getUser: () => string | null;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loginUser = (userData: User) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logoutUser = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  const getUser = () => user;

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};
