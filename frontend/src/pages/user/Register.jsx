import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/buttom/Button";

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
    <div className="h-full flex justify-center items-center">
      <form className="flex flex-col gap-4" onSubmit={handleRegister}>
        <h1 className="text-white text-3xl font-semibold">Cadastre-se</h1>
        <Input
          placeholder="Nome"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
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
        <Input
          placeholder="Confirmar senha"
          name="confirmpassword"
          type="password"
          value={formData.confirmpassword}
          onChange={handleChange}
        />
        <Button type="submit" text="Cadastrar" />
        <Button
          type="button"
          text="Já é cadastrado?"
          variant="'text"
          textColor="text-white"
          onClick={() => navigate("/login")}
        />
        {message && <p className="error-message">{message}</p>}
      </form>
    </div>
  );
}
