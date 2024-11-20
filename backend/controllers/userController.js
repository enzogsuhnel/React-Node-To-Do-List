import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Registro de usuário
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) return res.status(422).json({ msg: "O nome é obrigatório" });
  if (!email) return res.status(422).json({ msg: "e-mail é obrigatório" });
  if (!password) return res.status(422).json({ msg: "A senha é obrigatória" });
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
const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const updateUser = async (req, res) => {};

export default { loginUser, registerUser, getUserById };
