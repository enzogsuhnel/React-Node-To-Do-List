import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Input from "../../components/input/Input";
import Button from "../../components/buttom/Button";

export default function Profile() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const response = await api.post("/auth/register", formData);
      //setMessage(response.data.msg);
      //console.log(response);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Erro ao cadastrar");
    }
  };
  return (
    <div className="h-full flex justify-center items-center">
      <form
        id="editUser"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-white text-3xl font-semibold">Editar Perfil</h1>
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
        <Button type="submit" text="Salvar alterações" />
        {message && <p className="">{message}</p>}
      </form>
    </div>
  );
}
