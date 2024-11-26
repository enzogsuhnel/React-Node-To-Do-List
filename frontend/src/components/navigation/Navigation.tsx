export default function Navigation() {
  const login = false;

  return (
    <nav className="flex bg-teal-950 py-2 px-8 justify-between items-center h-14">
      <div className="flex gap-2">
        <h1 className="font-semibold text-xl text-white ">Enzo's list</h1>
        <span className="material-symbols-outlined text-white">edit</span>
      </div>
      {login && (
        <div
          className="flex gap-2 items-center bg-neutral-200 rounded-md
        px-3 py-2"
        >
          <div className="flex items-center justify-center">
            <span className="material-symbols-outlined">person</span>
          </div>
          <h2 className="font-semibold">Stephanie C.</h2>
        </div>
      )}
    </nav>
  );
}
