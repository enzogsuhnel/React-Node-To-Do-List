import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Drop, { OptionProps } from "../drop/Drop";

export default function Navigation() {
  // Context
  const userContext = useContext(UserContext);
  if (!userContext) {
    return null;
  }
  const [isDropProfileOpen, setIsDropProfileOpen] = useState(false);
  const { user, setMenuOpen, menuOpen, logoutUser } = userContext;
  const [userName, setUserName] = useState("");
  //Navigate
  const navigate = useNavigate();
  const handleToggleDropdown = () => {
    setIsDropProfileOpen(!isDropProfileOpen);
  };
  const getUserName = () => {
    const fullName = user?.name?.split(" ");
    fullName &&
      setUserName(
        `${fullName[0]} ${fullName[1] ? `${fullName[1].split("")[0]}.` : ""}`
      );
  };
  const options: OptionProps[] = [
    {
      text: "Editar perfil",
      onClick: () => {
        navigate("/profile");
      },
      color: "lightNeutral",
      startIcon: "person",
    },
    {
      text: "Sair",
      textColor: "error",
      onClick: () => {
        logoutUser();
        navigate("/login");
      },
      color: "lightNeutral",
      startIcon: "logout",
    },
  ];

  useEffect(() => {
    getUserName();
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
                <div id="drop-navbar">
                  <Button
                    startIcon="more_vert"
                    variant="text"
                    onClick={handleToggleDropdown}
                  />
                </div>
              </div>
            </div>
            {isDropProfileOpen && (
<<<<<<< HEAD
              <Drop
                options={options}
                onClose={() => setIsDropProfileOpen(false)}
                closeIconId="drop-navbar"
                position="leftBottom"
              />
=======
              <div className="flex flex-col w-44 absolute right-0 -bottom-20 shadow-md z-30 bg-neutral-300 rounded divide-y divide-neutral-300">
                <Button
                  startIcon="person"
                  text="Editar perfil"
                  color="lightNeutral"
                  onClick={() => {
                    navigate("/profile");
                    setIsDropProfileOpen(false);
                  }}
                />
                <Button
                  startIcon="logout"
                  text="Sair"
                  textColor="error"
                  color="lightNeutral"
                  onClick={() => {
                    logoutUser();
                    setIsDropProfileOpen(false);
                    navigate("/login");
                  }}
                />
              </div>
>>>>>>> f5d8ff3a9016cd2e51b6cc59bad65d6545b025f9
            )}
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
