import jwt from "jsonwebtoken";

const checkToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    
    userController.getUserById(req, res)

  } catch (error) {
    res.status(400).json({ msg: "Token inválido!" });
  }
};

export default checkToken;
