import { useState } from "react";
import api from "../../../services/api";
import "./homeStyle.css";
import { useNavigate } from "react-router-dom";

export default function LoginAuth() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", formData);
      setMessage(response.data.msg);
      console.log(response);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Falha ao Entrar");
    }
  };

  return (
    <div className="container-login">
      <form
        className="auth-form login-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="form-tittle">Entrar na Conta</h1>
        <input
          placeholder="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="button" onClick={handleLogin}>
          <span className="form-button-text">Entrar</span>
        </button>
        <button type="button" onClick={() => navigate("/register")}>
          <span className="form-button-text">Cadastre-se</span>
        </button>
        {message && <p className="error-message">{message}</p>}
      </form>
    </div>
  );
}
