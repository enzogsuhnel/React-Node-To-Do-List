import { useContext, useState } from "react";
import Input from "../../components/input/Input";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import api from "../../services/api";
import Hero from "../../components/hero/Hero";
import InputErrorMessage from "../../components/input/InputErrorMessage";
import { UserContext, UserParams } from "../../context/UserContext";
import { toast } from "react-toastify";

export default function Register() {
  const [userData, setUserData] = useState<UserParams>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const userContext = useContext(UserContext);
  if (!userContext) {
    return null;
  }
  const { registerUser } = userContext;
  const [message, setMessage] = useState("");
  const [inputError, setInputError] = useState(false);
  const navigate = useNavigate();

  const notifySuccess = (msg: string) => toast.success(msg);
  const notifyError = (msg: string) => toast.error(msg);

  const handleChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    e.target.value.trim() == "" && setInputError(true);
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (!inputError) {
      if (userData.password !== userData.confirmPassword) {
        setMessage("As senhas não conferem!");
      } else {
        try {
          const response = await registerUser(userData);
          setMessage(response.data.msg);
          notifySuccess("Usuário registrado com sucesso!");
          navigate("/login");
        } catch (error: any) {
          notifyError("Erro ao cadastrar-se.");
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
            value={userData.name}
            onChange={handleChange}
          />
          {inputError && userData.name.trim() == "" && <InputErrorMessage />}
          <Input
            placeholder="E-mail"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
          />
          {inputError && userData.email.trim() == "" && <InputErrorMessage />}
          <Input
            placeholder="Senha"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleChange}
          />
          {inputError && userData.password.trim() == "" && (
            <InputErrorMessage />
          )}
          <Input
            placeholder="Confirmar senha"
            name="confirmPassword"
            type="password"
            value={userData.confirmPassword}
            onChange={handleChange}
          />
          {inputError && userData.confirmPassword.trim() == "" && (
            <InputErrorMessage />
          )}
          {message && <p className="text-red-700">{message}</p>}
        </div>
        <Button type="submit" text="Cadastrar" />
        <p className="text-sm text-center">
          Já é cadastrado?{" "}
          <a
            href="/login"
            className="text-orange-500 hover:border-b hover:border-orange-500"
          >
            Entrar
          </a>
        </p>
      </form>
    </Hero>
  );
}
