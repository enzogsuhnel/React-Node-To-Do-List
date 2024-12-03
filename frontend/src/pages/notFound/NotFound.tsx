import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Retorna à página anterior
  };

  const handleHome = () => {
    navigate("/"); // Navega para a página inicial
  };
  return (
    <div className="bg-primary h-screen w-full flex flex-col items-center justify-center">
      <h1 className="font-semibold text-9xl text-teal-500">404</h1>
      <p className="text-neutral-200 mb-5 text-3xl font-extralight">
        Oops! A página não existe.
      </p>
      <div className="flex gap-4">
        <Button text="Voltar" type="button" onClick={handleGoBack} />
        <Button text="Tela incial" type="button" onClick={handleHome} />
      </div>
    </div>
  );
}
