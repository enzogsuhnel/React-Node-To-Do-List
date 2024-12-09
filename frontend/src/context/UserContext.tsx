import { createContext, ReactNode, useState } from "react";
import api from "../services/api.js";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}
export interface UserParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserUpdateParams {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

interface UserContextType {
  user: User | null;
  loginUser: (user: UserLogin) => any;
  logoutUser: () => void;
  deleteUser: (userId: string) => any;
  getUserById: (userId: string) => any;
  getUsersToShare: () => any;
  getSessionUser: () => string | null;
  registerUser: (userData: UserParams) => any;
  updateUser: (userData: UserUpdateParams, userId: string) => any;
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

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("/");

  const getUsersToShare = async () => {
    try {
      const response = await api.get("/user/share");
      return (await response.data) as User[];
    } catch (error: any) {}
  };

  const loginUser = async (userData: UserLogin) => {
    try {
      const response = await api.post("/user/auth/login/", userData);
      const sessionUser = await response.data;
      sessionStorage.setItem("user", JSON.stringify(sessionUser.user));
      sessionStorage.setItem("token", JSON.stringify(sessionUser.token));

      setUser(sessionUser.user);
      return response;
    } catch (error: any) {
      const errorMessage = error.response.data?.message || "Erro desconhecido.";
      return Promise.reject(new Error(errorMessage));
    }
  };

  const logoutUser = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
  };

  const registerUser = async (userData: UserParams) => {
    try {
      const response = await api.post("/user/auth/register", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
      });
      return response;
    } catch (error: any) {
      const errorMessage = error.response.data?.message || "Erro desconhecido.";
      return Promise.reject(new Error(errorMessage));
    }
  };

  const getUserById = async (userId: string) => {
    try {
      const response = await api.get(`/user/${userId}`);
      return response;
    } catch (error: any) {
      const errorMessage = error.response.data?.message || "Erro desconhecido.";
      return Promise.reject(new Error(errorMessage));
    }
  };

  const getSessionUser = () => user;
  const deleteUser = async (userId: string) => {
    try {
      //o erro ta antes do res
      const response = await api.delete(`/user/${userId}`);
      logoutUser();
      return response;
    } catch (error: any) {
      const errorMessage = error.response.data?.message || "Erro desconhecido.";

      return Promise.reject(new Error(errorMessage));
    }
  };
  const updateUser = async (userData: UserUpdateParams, userId: string) => {
    try {
      const response = await api.patch(`/user/${userId}`, {
        name: userData.name?.trim() != "" ? userData.name?.trim() : undefined,
        email:
          userData.email?.trim() != "" ? userData.email?.trim() : undefined,
        password:
          userData.password?.trim() != ""
            ? userData.password?.trim()
            : undefined,
        confirmPassword:
          userData.confirmPassword?.trim() != ""
            ? userData.confirmPassword?.trim()
            : undefined,
      });
      setUser(userData);
      return response;
    } catch (error: any) {
      const errorMessage = error.response.data?.message || "Erro desconhecido.";
      return Promise.reject(new Error(errorMessage));
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        getUserById,
        getUsersToShare,
        deleteUser,
        getSessionUser,
        registerUser,
        updateUser,
        activeRoute,
        setActiveRoute,
        menuOpen,
        setMenuOpen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
