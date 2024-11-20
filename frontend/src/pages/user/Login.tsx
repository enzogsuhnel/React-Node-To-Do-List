import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Input from "../../components/input/Input";
import Button from "../../components/buttom/Button";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Context
  const userContext = useContext(UserContext);

  if (!userContext) {
    return null;
  }

  const { user, setUser } = userContext;

  //Navigate
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/auth/login", formData);
      setMessage(response.data.msg);
      setUser(response.data.user);
      navigate("/tasks");
    } catch (error: any) {
      setMessage(error.response?.data?.msg || "Falha ao Entrar");
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="h-full flex w-full justify-center items-center">
      <form
        className=" flex flex-col gap-4 sm:w-1/2 md:1/3 w-full mx-8 lg:w-1/3"
        onSubmit={handleLogin}
      >
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
        <Button type="submit" text="Entrar" />
        <Button
          type="button"
          variant="outlined"
          textColor="text-white"
          text="Cadastre-se"
          onClick={() => navigate("/register")}
        />

        {message && <p className="text-error">{message}</p>}
      </form>
    </div>
  );
}
