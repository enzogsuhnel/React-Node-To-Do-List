import "./style.css";

export default function Navigation() {
  return (
    <nav className="flex bg-primary py-2 px-8 justify-between items-center">
      <div className="flex gap-2">
        <h1 className="font-semibold text-xl text-white ">Enzo`s list</h1>
        <span className="material-symbols-outlined">edit</span>
      </div>
      <div className="flex gap-2 items-center">
        <div className="bg-lightgreen rounded-full w-12 h-12 flex items-center justify-center">
          <span className="material-symbols-outlined">person</span>
        </div>
        <h2>Stephanie C</h2>
      </div>
    </nav>
  );
}
