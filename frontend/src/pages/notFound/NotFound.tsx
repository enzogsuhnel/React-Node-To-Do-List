import { useNavigate } from "react-router-dom";
import "./style.css";
import Button from "../../components/buttom/Button";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Retorna à página anterior
  };

  const handleHome = () => {
    navigate("/"); // Navega para a página inicial
  };
  return (
    <div className="not-found-container">
      <h1 className="font-semibold text-9xl text-orange-600">404</h1>
      <p className="text-neutral-200 mb-5 text-3xl font-extralight">
        Oops! A página não existe.
      </p>
      <div className="not-found-buttons">
        <Button
          text="Voltar"
          variant="containedWhite"
          type="button"
          onClick={handleGoBack}
        />
        <Button
          text="Tela incial"
          variant="containedWhite"
          type="button"
          onClick={handleHome}
        />
      </div>
    </div>
  );
}
