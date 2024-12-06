import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

export default function Navigation() {
  // Context
  const userContext = useContext(UserContext);
  if (!userContext) {
    return null;
  }
  const { user, setMenuOpen, menuOpen, logoutUser } = userContext;
  const [userName, setUserName] = useState("");
  //Navigate
  const navigate = useNavigate();

  const getUserName = () => {
    const fullName = user?.name?.split(" ");
    fullName &&
      setUserName(
        `${fullName[0]} ${fullName[1] ? `${fullName[1].split("")[0]}.` : ""}`
      );
  };

  useEffect(() => {
    getUserName();
    console.log("Nav user: ", user?.name);
  }, [user]);

  return (
    <nav className="sticky top-0 flex gap-8 bg-primary py-2 px-6 items-center z-30">
      {user && (
        <div
          id="menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className={
            "cursor-pointer text-white flex items-center justify-center"
          }
        >
          <span className="material-symbols-outlined">menu</span>
        </div>
      )}
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2">
          <span className="material-symbols-outlined -scale-x-100 text-teal-400">
            edit
          </span>
          <a href="/" className="font-semibold text-xl text-white ">
            Enzo's list
          </a>
        </div>
        {user ? (
          <div className="relative">
            <div
              className="flex gap-4 items-center 
        px-3 py-2 text-white"
            >
              <div className="flex items-center justify-center rounded-full p-2 bg-teal-600 w-10 h-10">
                <p className="font-semibold text-xl">{userName[0]}</p>
              </div>
              <h2 className="font-semibold">{userName}</h2>
              <div className="cursor-pointer hover:bg-teal-900 flex items-center justify-center rounded-full p-2  w-10 h-10">
                <span className="material-symbols-outlined">more_vert</span>
              </div>
            </div>
            <div className="flex flex-col w-44 absolute right-0 -bottom-20 shadow-md z-30 bg-neutral-300 rounded divide-y divide-neutral-300">
              <Button
                startIcon="person"
                text="Editar perfil"
                color="lightNeutral"
                onClick={() => {
                  navigate("/profile");
                }}
              />
              <Button
                startIcon="logout"
                text="Sair"
                textColor="error"
                color="lightNeutral"
                onClick={() => {
                  logoutUser();
                  navigate("/login");
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex gap-8">
            <Button
              text="Entrar"
              type="button"
              onClick={() => {
                navigate("/login");
              }}
              variant="text"
              textColor="white"
            />
            <Button
              text="Cadastrar-se"
              type="button"
              onClick={() => {
                navigate("/register");
              }}
            />
          </div>
        )}
      </div>
    </nav>
  );
}
