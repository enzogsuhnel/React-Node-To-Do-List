import React, { createContext, ReactNode, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
