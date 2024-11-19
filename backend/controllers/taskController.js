import Task from "../models/Task.js";

const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  if (!title) return res.status(422).json({ msg: "O título é obrigatório!" });
  try {
    const task = new Task({ title, description, status });
    await task.save();
    res.status(201).json({ msg: "Tarefa criada com sucesso!" });
  } catch (error) {
    res.status(500).json({
      msg: "Houve um erro no servidor, entre em contato com o suporte.",
    });
  }
};

export default createTask;
