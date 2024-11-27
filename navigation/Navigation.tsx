import { useNavigate } from "react-router-dom";
import Button from "../buttom/Button";

export default function Navigation() {
  const login = false;

  //Navigate
  const navigate = useNavigate();

  return (
    <nav className="flex bg-teal-950 py-8 px-8 justify-between items-center h-14">
      <div className="flex gap-2">
        <span className="material-symbols-outlined -scale-x-100 text-teal-400">edit</span>
        <h1 className="font-semibold text-xl text-white ">Enzo's list</h1>
      </div>
      {login ? (
        <div
          className="flex gap-2 items-center bg-neutral-200 rounded-md
        px-3 py-2"
        >
          <div className="flex items-center justify-center">
            <span className="material-symbols-outlined">person</span>
          </div>
          <h2 className="font-semibold">Stephanie C.</h2>
        </div>
      ) :
        <div className="flex gap-8">
          <Button text="Entrar" type="button" onClick={() => { navigate("/login") }} variant="text" textColor="text-white" />
          <Button text="Cadastrar-se" type="button" onClick={() => { navigate("/register") }} />
        </div>}
    </nav>
  );
}
