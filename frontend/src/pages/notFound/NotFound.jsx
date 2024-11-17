import { useNavigate } from "react-router-dom";
import "./style.css";

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
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! A página não existe.</p>
      <div className="not-found-buttons">
        <button className="not-found-button" onClick={handleGoBack}>
          Go Back
        </button>
        <button className="not-found-button" onClick={handleHome}>
          Go to Home
        </button>
      </div>
    </div>
  );
}
