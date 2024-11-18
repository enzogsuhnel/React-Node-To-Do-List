import React, { useState } from "react";
import Button from "../../components/buttom/Button";
import Input from "../../components/input/Input";

export default function Tasks() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [tasks, setTasks] = useState<string[]>([]);
  const createTask = () => {
    setTasks([...tasks, formData.title]);
  };
  return (
    <div>
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
        <div>
          <Input
            name="title"
            placeholder="Tarefa"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <Button
          text="Criar nova tarefa"
          textColor="text-white"
          variant="contained"
          type="button"
          onClick={createTask}
        />
      </div>
    </div>
  );
}
