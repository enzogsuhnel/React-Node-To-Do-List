import { useState } from "react";
import api from "../../services/api";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", formData);
      setMessage(response.data.msg);
      console.log(response);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Erro ao cadastrar");
    }
  };

  return (
    <div className="container-register">
      <form className="auth-form register-form" onSubmit={handleRegister}>
        <h1 className="form-tittle">Cadastre-se</h1>
        <input
          placeholder="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
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
        <input
          placeholder="Confirm Password"
          name="confirmpassword"
          type="password"
          value={formData.confirmpassword}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar-se</button>
        <button type="button" onClick={() => navigate("/login")}>
          Já é cadastrado?
        </button>
        {message && <p className="error-message">{message}</p>}
      </form>
    </div>
  );
}
