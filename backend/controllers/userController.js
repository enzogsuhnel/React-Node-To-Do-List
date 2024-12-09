import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import TaskList from "../models/TaskList.js";

const getUsersToShare = async (req, res) => {
  try {
    const userId = req.user.id;
    const users = await User.find({ _id: { $ne: userId } }).select("-password");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar usuários", error: err });
  }
};

// Registro de usuário
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name) return res.status(422).json({ msg: "O nome é obrigatório" });
  if (!email) return res.status(422).json({ msg: "e-mail é obrigatório" });
  if (!password) return res.status(422).json({ msg: "A senha é obrigatória" });
  if (!confirmPassword)
    return res
      .status(422)
      .json({ msg: "A confirmação de senha é obrigatória!" });
  if (password !== confirmPassword)
    return res.status(422).json({ msg: "As senhas não coincidem!" });

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(422).json({ msg: "E-mail já cadastrado!" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({ name, email, password: passwordHash });

  try {
    await user.save();
    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).json({
      msg: "Houve um erro no servidor, entre em contato com o suporte.",
    });
  }
};

// Login de usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(422).json({ msg: "E-mail inválido." });
  if (!password) return res.status(422).json({ msg: "Senha incorreta." });

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: "E-mail não está cadastrado!" });
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha incorreta." });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user._id }, secret);
    res
      .status(200)
      .json({ user, msg: "Autenticação realizada com sucesso", token });
  } catch (error) {
    res.status(500).json({
      msg: "Houve um erro no servidor, entre em contato com o suporte.",
    });
  }
};

// Obter dados do usuário
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      return res.status(404).json({ msg: "Usuário nao encontrado!" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Erro no servidor" });
  }
};

//Atualizar usuário
const updateUser = async (req, res) => {
  const id = req.user.id;
  const update = req.body;

  try {
    if (update.password && update.confirmPassword) {
      if (update.password !== update.confirmPassword)
        return res.status(422).json({ msg: "As senhas não coincidem!" });

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(update.password, salt);
      update.password = passwordHash;
      delete update.confirmPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Usuário atualizado com sucesso.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao atualizar suas informações.",
      error: error.message,
    });
  }
};

//Deletar conta usuário
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não está logado." });
    }

    if (user.id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Você não tem permissão para deletar esta conta." });
    }

    // Deleta todas as tarefas associadas à lista
    await TaskList.deleteMany({ userId: id });
    await user.deleteOne();

    res.status(200).json({
      message: "Conta deletada com sucesso.",
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar a conta.", error });
  }
};
export default {
  getUsersToShare,
  loginUser,
  registerUser,
  getUserById,
  updateUser,
  deleteUser,
};
