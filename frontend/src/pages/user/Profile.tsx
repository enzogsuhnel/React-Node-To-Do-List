import { useState } from "react";
import api from "../../services/api";
import Input from "../../components/input/Input";
import Button from "../../components/buttom/Button";

export default function Profile() {
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      //const response = await api.post("/auth/register", formData);
      //setMessage(response.data.msg);
      //console.log(response);
    } catch (error: any) {
      setMessage(error.response?.data?.msg || "Erro ao cadastrar");
    }
  };
  return (
    <div className="h-full flex justify-center items-center">
      <form
        id="editUser"
        className="flex flex-col gap-4 sm:w-1/2 md:1/3 w-full mx-8 lg:w-1/3"
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
