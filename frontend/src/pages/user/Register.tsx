import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/buttom/Button";
import api from "../../services/api";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("As senhas não conferem!");
    } else {
      try {
        const response = await api.post("/user/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        setMessage(response.data.msg);
        console.log(response);
      } catch (error: any) {
        setMessage(error.response?.data?.msg || "Erro ao cadastrar");
      }
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <form
        className=" flex flex-col gap-4 sm:w-1/2 md:1/3 w-full mx-8 lg:w-1/3"
        onSubmit={handleRegister}
      >
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
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit" text="Cadastrar" />
        <Button
          type="button"
          text="Já é cadastrado?"
          variant="text"
          textColor="text-white"
          onClick={() => navigate("/login")}
        />
        {message && <p className="error-message">{message}</p>}
      </form>
    </div>
  );
}
