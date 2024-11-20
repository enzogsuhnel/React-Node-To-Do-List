import React, { useState } from "react";
import Button from "../../components/buttom/Button";
import Input from "../../components/input/Input";
import api from "../../services/api";

export default function Tasks() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "False",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTask = async (e: any) => {
    e.preventDefault();
    try {
      const response = await api.post("/task/create-task", {
        title: formData.title,
        status: false,
        description: formData.description,
      });
      setMessage(response.data.msg);
      console.log(response);
    } catch (error: any) {
      setMessage(error.response?.data?.msg || "Erro ao cadastrar");
    }
  };
  const [tasks, setTasks] = useState<string[]>([]);
  const createTask = () => {
    setTasks([...tasks, formData.title]);
  };
  return (
    <div className="w-full">
      <h1>Bom dia, Sullivan</h1>
      {tasks.map((task, index) => (
        <div className="bg-neutral-200 rounded-sm p-2 flex gap-2" key={index}>
          <input type="checkbox" name="" id={`${index}`} />
          <label className="w-full block" htmlFor={`${index}`}>
            {task}
          </label>
        </div>
      ))}
      <div className="absolute bottom-4">
        <form onSubmit={handleTask}>
          <div className="flex flex-col bg-neutral-400 p-3 gap-2 mb-2 rounded-md ">
            <Input
              name="title"
              placeholder="Tarefa"
              type="text"
              value={formData.title}
              onChange={handleChange}
            />
            <Input
              name="description"
              placeholder="Descrição"
              type="text"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <Button
            text="Criar nova tarefa"
            textColor="text-white"
            variant="contained"
            type="submit"
            onClick={createTask}
          />
        </form>
      </div>
    </div>
  );
}
