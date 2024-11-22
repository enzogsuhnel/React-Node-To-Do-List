import Task from "../models/Task.js";
import TaskList from "../models/TaskList.js";

const createTask = async (req, res) => {
  try {
    const { description, taskListId, isCompleted } = req.body;
    const task = new Task({ description, isCompleted, taskListId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar tarefa" });
  }
};

const getTasks = async (req, res) => {
  try {
    const { listId } = req.params;
    const tasks = await Task.find({ taskListId: listId });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: "Erro ao buscar tarefas" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  // Verifica se a lista existe
  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ msg: "Tarefa não encontrada." });
    }
    //ERRO ESTÁ NO REQ.USER.ID -> VALIDAR NO TASKLISTCONTROLLER
    // Verifica se o usuário tem permissão para atualizar
    const taskList = await TaskList.findById(task.taskListId);
    if (taskList.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Você não tem permissão para atualizar esta tarefa.",
      });
    }
    // Atualiza a Tarefa de tarefas
    const updatedTask = await Task.findByIdAndUpdate(id, update, {
      new: true, // Retorna a Tarefa atualizada
      runValidators: true, // Valida os dados antes de atualizar
    });

    res
      .status(200)
      .json({ msg: "Tarefa atualizada com sucesso.", taskList: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar a tarefa.", error });
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    //Fazer get para apenas uma lista?
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada." });
    }

    const taskList = await TaskList.findById(task.taskListId);
    if (taskList.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Você não tem permissão para excluir esta tarefa.",
      });
    }
    // Deleta  tarefa
    await task.deleteOne();

    res.status(200).json({ message: "Tarefa deletada com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar a lista.", error });
  }
};

export default { createTask, getTasks, updateTask, deleteTask };
