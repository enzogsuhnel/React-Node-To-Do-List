import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { UserContext } from "../../context/UserContext";
import { ApiContext, TaskList } from "../../context/ApiContext";
import useClickOutside from "../../hooks/useClickOutside";

export default function AsideBar() {
  const [openMenu, setOpenMenu] = useState(true);
  const [taskLists, setTaskLists] = useState<TaskList[] | undefined>(undefined);
  const [taskListsShared, setTaskListsShared] = useState<
    TaskList[] | undefined
  >(undefined);

  const options = [
    {
      name: "Minhas listas",
      route: "/task-list",
      icon: "edit_square",
      subItems: taskLists,
      action: {
        text: "Nova lista",
        icon: "add",
        onclick: () => {
          navigate("task-list");
        },
      },
    },
    {
      name: "Compartilhados comigo",
      icon: "share",
      subItems: taskListsShared,
    },
  ];

  // Context
  const userContext = useContext(UserContext);
  const apiContext = useContext(ApiContext);

  if (!userContext || !apiContext) {
    return null;
  }

  const { getTaskLists, getTaskListsShared, request } = apiContext;
  const { menuOpen, setMenuOpen, activeRoute, setActiveRoute } = userContext;

  const onCloseMenu = () => {
    menuOpen && setMenuOpen(false);
  };

  const navigate = useNavigate();
  const asidebarRef = useRef<HTMLDivElement>(null);
  useClickOutside(asidebarRef, onCloseMenu, undefined, "menu");

  const getTaskListsFromUser = async () => {
    const taskLists = await getTaskLists();
    setTaskLists(taskLists);
  };

  const getTaskListsSharedFromUser = async () => {
    const taskLists = await getTaskListsShared();
    setTaskListsShared(taskLists);
  };

  useEffect(() => {
    const path = window.location.pathname;
    setActiveRoute(path);
    getTaskListsFromUser();
    getTaskListsSharedFromUser();
  }, [activeRoute, request]);

  return (
    <aside
      ref={asidebarRef}
      className={`flex h-screen z-10 fixed top-[70px] ${
        menuOpen
          ? "visible w-[310px] items-start p-4"
          : "invisible md:visible w-0 md:w-[75px] items-center"
      } overflow-hidden shadow flex flex-col gap-4 justify-start  bg-primary py-4 transition-all duration-300 ease-in-out`}
    >
      {options.map((el, index) => {
        const isActive = activeRoute == el.route;
        return (
          <div className="flex flex-col text-white" key={index}>
            <div
              className={`flex justify-start items-center w-fit gap-4 cursor-pointer`}
              onClick={() => el.route ? navigate(el.route) : null}
            >
              <div
                className={`p-2  rounded flex items-center justify-center ${
                  isActive && !menuOpen && "bg-teal-600"
                }`}
              >
                <span className="material-symbols-outlined">{el.icon}</span>
              </div>
              {menuOpen && (
                <label className={` cursor-pointer flex gap-6 items-center`}>
                  {el.name}
                  {el.subItems && (
                    <span className="material-symbols-outlined cursor-pointer hover:text-neutral-300">
                      keyboard_arrow_up
                    </span>
                  )}
                </label>
              )}
            </div>
            {menuOpen &&
              el.subItems?.map((subItem, index) => (
                <div
                  key={index}
                  className="cursor-pointer px-4 py-1 my-1"
                  onClick={() => {
                    navigate("/task-list", { state: { taskList: subItem } });
                    setMenuOpen(false);
                  }}
                >
                  <label>{subItem.name}</label>
                </div>
              ))}
            {menuOpen && el.action && (
              <Button
                text={"Nova lista"}
                startIcon="add"
                onClick={() => {
                  navigate("/task-list");
                  setMenuOpen(false);
                }}
              />
            )}
          </div>
        );
      })}
    </aside>
  );
}
