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

const getTaskListsShared = async (req, res) => {
  const userId = req.user.id; // ID do usuário autenticado

  try {
    // Buscar listas onde o usuário está no array sharedWith
    const sharedTaskLists = await TaskList.find({ sharedWith: userId })
      .populate("userId", "name email") // Opcional: Popula dados do proprietário
      .exec();

    res.status(200).json(sharedTaskLists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shared TaskLists", error });
  }
};

const deleteTaskList = async (req, res) => {
  const { id } = req.params;

  try {
    const taskList = await TaskList.findById(id);
    //Fazer get para apenas uma lista?
    if (!taskList) {
      return res
        .status(404)
        .json({ message: "Lista de tarefas não encontrada." });
    }

    if (taskList.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Você não tem permissão para deletar esta lista." });
    }

    // Deleta todas as tarefas associadas à lista
    await Task.deleteMany({ taskListId: id });

    // Deleta a lista de tarefas
    await taskList.deleteOne();

    res.status(200).json({
      message:
        "Lista de tarefas e suas tarefas associadas foram deletadas com sucesso.",
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar a lista.", error });
  }
};
const updateList = async (req, res) => {
  const { id } = req.params; // ID da TaskList
  const update = req.body; // Dados a serem atualizados

  try {
    // Verifica se a lista existe
    const taskList = await TaskList.findById(id);

    if (!taskList) {
      return res
        .status(404)
        .json({ message: "Lista de tarefas não encontrada." });
    }

    // Verifica se o usuário tem permissão para atualizar
    if (taskList.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Você não tem permissão para atualizar esta lista." });
    }

    // Atualiza a lista de tarefas
    const updatedTaskList = await TaskList.findByIdAndUpdate(id, update, {
      new: true, // Retorna a lista atualizada
      runValidators: true, // Valida os dados antes de atualizar
    });

    res.status(200).json({
      message: "Lista de tarefas atualizada com sucesso.",
      taskList: updatedTaskList,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar a lista.", error });
  }
};

const shareTaskList = async (req, res) => {
  const { id } = req.params; // ID da taskList
  const { userIds } = req.body; // IDs dos usuários para compartilhar
  const userId = req.user.id; // ID do usuário autenticado

  try {
    const taskList = await TaskList.findOne({ _id: id, userId });
    if (!taskList) {
      return res
        .status(404)
        .json({ message: "TaskList not found or unauthorized" });
    }

    // Filtrar apenas os usuários que ainda não estão na lista `sharedWith`
    const newUserIds = userIds.filter(
      (id) => !taskList.sharedWith.includes(id)
    );

    if (newUserIds.length === 0) {
      return res.status(404).json({ message: "No new users to share with" });
    }

    // Atualizar a lista com os novos usuários
    taskList.sharedWith.push(...newUserIds);
    await taskList.save();

    res.status(200).json({
      message: "TaskList shared successfully",
      sharedWith: taskList.sharedWith,
      taskList: taskList,
    });
  } catch (error) {
    res.status(500).json({ message: "Error sharing TaskList", error });
  }
};

const getSharedUsers = async (req, res) => {
  const { id } = req.params; // ID da TaskList
  const userId = req.user.id; // ID do usuário autenticado

  try {
    // Buscar a TaskList com o ID especificado e verificar o proprietário
    const taskList = await TaskList.findOne({ _id: id, userId }).populate(
      "sharedWith",
      "name email"
    );
    if (!taskList) {
      return res
        .status(404)
        .json({ message: "TaskList not found or unauthorized" });
    }

    // Retornar a lista de usuários com quem a TaskList está compartilhada
    res.status(200).json({ sharedWith: taskList.sharedWith });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving shared users", error });
  }
};

const unshareTaskList = async (req, res) => {
  const { id } = req.params; // ID da taskList
  const { userIdToRemove } = req.body; // ID do usuário a ser removido
  const userId = req.user.id; // ID do usuário autenticado

  try {
    const taskList = await TaskList.findOne({ _id: id, userId });
    if (!taskList) {
      return res
        .status(404)
        .json({ message: "TaskList not found or unauthorized" });
    }

    // Verificar se o usuário está na lista compartilhada
    if (!taskList.sharedWith.includes(userIdToRemove)) {
      return res
        .status(400)
        .json({ message: "User is not in shared list" });
    }

    // Remover o usuário da lista `sharedWith`
    taskList.sharedWith = taskList.sharedWith.filter(
      (id) => id.toString() !== userIdToRemove
    );

    await taskList.save();

    res.status(200).json({
      message: "User removed from shared list",
      sharedWith: taskList.sharedWith,
      taskList: taskList,
    });
  } catch (error) {
    res.status(500).json({ message: "Error unsharing TaskList", error });
  }
};

export default {
  createList,
  getLists,
  deleteTaskList,
  updateList,
  getTaskListsShared,
  shareTaskList,
  unshareTaskList,
  getSharedUsers,
};
