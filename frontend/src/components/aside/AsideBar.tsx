import React from "react";
import { useNavigate } from "react-router-dom";

export default function AsideBar() {
  const navigate = useNavigate();
  const createList = () => {
    navigate("task-list");
  };

  return (
    <aside className="flex-col p-2 pr-6 gap-2 h-full bg-white w-full sm:w-[160px] md:w-[250px]">
      <div className="items-center">
        <div className="flex items-center justify-between">
          <label className="font-semibold">Listas de tarefas</label>
          <button
            onClick={createList}
            className="w-8 h-8  flex items-center justify-center rounded-full hover:bg-neutral-300"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        </div>
        <a></a>
      </div>
    </aside>
  );
}
