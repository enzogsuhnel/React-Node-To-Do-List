import { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import api from "../../services/api";
import Hero from "../../components/hero/Hero";
import InputErrorMessage from "../../components/input/InputErrorMessage";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    e.target.value.trim() == "" && setInputError(true)
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (!inputError) {
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
    }
  };

  return (
    <Hero>
      <form
        className="w-full lg:w-1/2 bg-white rounded-l-[40px] px-10 py-10 overflow-hidden flex flex-col gap-10"
        onSubmit={handleRegister}
      >
        <h1 className=" text-2xl">Cadastrar-se</h1>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Nome"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          {inputError && formData.name.trim() == "" && <InputErrorMessage />}
          <Input
            placeholder="E-mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          {inputError && formData.email.trim() == "" && <InputErrorMessage />}
          <Input
            placeholder="Senha"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {inputError && formData.password.trim() == "" && <InputErrorMessage />}
          <Input
            placeholder="Confirmar senha"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {inputError && formData.confirmPassword.trim() == "" && <InputErrorMessage />}
          {message && <p className="text-red-700">{message}</p>}
        </div>
        <Button type="submit" text="Cadastrar" />
        <p className="text-sm text-center">Já é cadastrado? <a href="/login" className="text-orange-500 hover:border-b hover:border-orange-500">Entrar</a></p>
      </form>
    </Hero>
  );
}
