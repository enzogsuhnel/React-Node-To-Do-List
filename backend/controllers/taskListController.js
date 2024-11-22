import TaskList from "../models/TaskList.js";
import Task from "../models/Task.js";

const createList = async (req, res) => {
  try {
    const { name } = req.body;
    const list = new TaskList({ name, userId: req.user.id });
    await list.save();
    res.status(201).json(list);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar lista" });
  }
};

const getLists = async (req, res) => {
  try {
    const lists = await TaskList.find({ userId: req.user.id });
    res.json(lists);
  } catch (err) {
    res.status(400).json({ error: "Erro ao buscar listas" });
  }
};


const deleteTaskList = async (req, res) => {
  const { id } = req.params;

  try {
    const taskList = await TaskList.findById(id);
    //Fazer get para apenas uma lista?
    if (!taskList) {
      return res.status(404).json({ message: 'Lista de tarefas não encontrada.' });
    }

    if (taskList.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Você não tem permissão para deletar esta lista.' });
    }

    // Deleta todas as tarefas associadas à lista
    await Task.deleteMany({ taskListId: id });

    // Deleta a lista de tarefas
    await taskList.deleteOne();

    res.status(200).json({ message: 'Lista de tarefas e suas tarefas associadas foram deletadas com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a lista.', error });
  }
};
const updateList = async (req, res) => {
  const { id } = req.params; // ID da TaskList
  const update = req.body; // Dados a serem atualizados

  try {
    // Verifica se a lista existe
    const taskList = await TaskList.findById(id);

    if (!taskList) {
      return res.status(404).json({ message: 'Lista de tarefas não encontrada.' });
    }

    // Verifica se o usuário tem permissão para atualizar
    if (taskList.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Você não tem permissão para atualizar esta lista.' });
    }

    // Atualiza a lista de tarefas
    const updatedTaskList = await TaskList.findByIdAndUpdate(id, update, {
      new: true, // Retorna a lista atualizada
      runValidators: true, // Valida os dados antes de atualizar
    });

    res.status(200).json({
      message: 'Lista de tarefas atualizada com sucesso.',
      taskList: updatedTaskList,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a lista.', error});
  }
};
 

export default { createList, getLists, deleteTaskList, updateList };
