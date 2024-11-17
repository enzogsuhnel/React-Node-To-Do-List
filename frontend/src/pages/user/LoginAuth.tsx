import { useState } from "react";
import api from "../../services/api";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import Input from "../../components/input/Input";
import React from "react";

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", formData);
      setMessage(response.data.msg);
      console.log(response);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Falha ao Entrar");
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
        <form className=" flex flex-col gap-4" onSubmit={handleLogin}>
          <h1 className="text-white text-3xl font-semibold">Login</h1>
          <Input
            placeholder="E-mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            placeholder="Senha"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">
            <span className="bg-primary">Entrar</span>
          </button>
          <button type="button" onClick={() => navigate("/register")}>
            <span className="form-button-text">Cadastre-se</span>
          </button>
          {message && <p className="error-message">{message}</p>}
        </form>
     
    </div>
  );
}
