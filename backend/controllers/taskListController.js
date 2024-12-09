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
    const sharedTaskLists = await TaskList.find({
      sharedWith: { $elemMatch: { $eq: userId } },
    })
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
        .json({ message: "Lista não encontrada ou acesso não autorizado." });
    }

    // Filtrar apenas os usuários que ainda não estão na lista `sharedWith`
    const newUserIds = userIds.filter(
      (id) => !taskList.sharedWith.includes(id)
    );

    if (newUserIds.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum usuário para compartilhar." });
    }

    // Atualizar a lista com os novos usuários
    taskList.sharedWith.push(...newUserIds);
    await taskList.save();

    res.status(200).json({
      message: "Lista compartilhada com sucesso!",
      sharedWith: taskList.sharedWith,
      taskList: taskList,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao compartilhar lista!", error });
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
        .json({ message: "Lista não encontrada ou acesso não autorizado." });
    }

    // Retornar a lista de usuários com quem a TaskList está compartilhada
    res.status(200).json({ sharedWith: taskList.sharedWith });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar usuários compartilhados.", error });
  }
};

const unshareTaskList = async (req, res) => {
  const { id } = req.params; // ID da taskList
  const { userIdToRemove } = req.body; // ID do usuário a ser removido
  const userId = req.user.id; // ID do usuário autenticado

  try {
    const taskList = await TaskList.findOne({
      _id: id,
      userId,
      sharedWith: { $elemMatch: { $eq: userIdToRemove } },
    });

    if (!taskList) {
      return res
        .status(404)
        .json({ message: "Lista não encontrada ou acesso não autorizado." });
    }

    // Verificar se o usuário está na lista compartilhada
    if (!taskList.sharedWith.includes(userIdToRemove)) {
      return res
        .status(400)
        .json({ message: "Lista não está compartilhada com este usuário." });
    }

    // Remover o usuário da lista `sharedWith`
    taskList.sharedWith = taskList.sharedWith.filter(
      (id) => id.toString() !== userIdToRemove
    );

    await taskList.save();

    res.status(200).json({
      message: "Usuário removido da lista de compartilhados.",
      sharedWith: taskList.sharedWith,
      taskList: taskList,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao descompartilhar.", error });
  }
};

const unfollowTaskList = async (req, res) => {
  const { id } = req.params; // ID da taskList
  const { ownerUserId } = req.body; // ID do usuário a ser removido
  const userId = req.user.id; // ID do usuário autenticado

  try {
    const taskList = await TaskList.findOne({
      _id: id,
      userId: ownerUserId,
      sharedWith: { $elemMatch: { $eq: userId } },
    });

    if (!taskList) {
      return res
        .status(404)
        .json({ message: "Lista não encontrada ou acesso não autorizado." });
    }

    // Verificar se o usuário está na lista compartilhada
    if (!taskList.sharedWith.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Lista não está compartilhada com este usuário." });
    }

    // Remover o usuário da lista `sharedWith`
    taskList.sharedWith = taskList.sharedWith.filter(
      (id) => id.toString() !== userId
    );

    await taskList.save();

    res.status(200).json({
      message: "Usuário removido da lista de compartilhados.",
      sharedWith: taskList.sharedWith,
      taskList: taskList,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao descompartilhar.", error });
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
  unfollowTaskList,
};
