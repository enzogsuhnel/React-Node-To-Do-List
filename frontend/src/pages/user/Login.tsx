import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { UserContext, UserLogin } from "../../context/UserContext";
import Hero from "../../components/hero/Hero";
import InputErrorMessage from "../../components/input/InputErrorMessage";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function Login() {
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });

  // Context
  const userContext = useContext(UserContext);

  if (!userContext) {
    return null;
  }

  const notifySuccess = (msg: string) => toast.success(msg);
  const notifyError = (msg: string) => toast.error(msg);

  const { loginUser } = userContext;

  //Navigate
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    e.target.value.trim() == "" && setInputError(true);
  };

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputError) {
      try {
        await loginUser(formData);
        notifySuccess("Login efetuado com sucesso!");
        navigate("/task-list");
      } catch (error: any) {
        notifyError("Erro ao fazer login.-");
      }
    }
  };

  return (
    <Hero>
      <form
        className="w-full h-fit lg:w-1/2 bg-white rounded-l-[40px] px-10 py-10 overflow-hidden flex flex-col gap-10"
        onSubmit={handleLogin}
      >
        <h1 className=" text-2xl">Entrar</h1>
        <div className="flex flex-col gap-4">
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
          {inputError && formData.password.trim() == "" && (
            <InputErrorMessage />
          )}
          {message && <p className="text-red-700">{message}</p>}
        </div>
        <Button type="submit" text="Entrar" />
        <p className="text-sm text-center">
          Não é cadastrado?{" "}
          <a
            href="/register"
            className="text-orange-500 hover:border-b hover:border-orange-500"
          >
            Cadastrar-se
          </a>
        </p>
      </form>
    </Hero>
  );
}
