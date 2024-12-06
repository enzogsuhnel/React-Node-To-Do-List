import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { User, UserContext, UserUpdateParams } from "../../context/UserContext";

export default function Profile() {
  const [message, setMessage] = useState("");
  const [inputError, setInputError] = useState(false);
  const [userData, setUserData] = useState<UserUpdateParams>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //Context
  const userContext = useContext(UserContext);
  if (!userContext) {
    return null;
  }
  const { updateUser, user, getUserById, deleteUser } = userContext;

  const [userInfo, setUserInfo] = useState<User | undefined>();
  //Navigate
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteUser = async () => {
    console.log("Entrei na Função Handle");
    try {
      const response = userInfo && (await deleteUser(userInfo?._id));
      console.log(response);
      navigate("/login");
      return response;
    } catch (error: any) {
      setMessage("Erro ao excluir conta. Tente novamente!");
    }
  };
  const handleUpdateUser = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputError) {
      console.log("Data: ", userData);

      if (userData.password?.trim() !== "") {
        console.log("quero alterar senha");

        if (userData.confirmPassword?.trim() != userData.password?.trim()) {
          setMessage("Senhas nao conferem");
          return;
        }
      }

      try {
        const response = await updateUser(userData, userInfo?._id || "");
        console.log("foi?: ", response);

        return response;
      } catch (error: any) {
        setMessage("Erro ao alterar infrmações. Tente novamente!");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const response = user && (await getUserById(user._id));
    setUserInfo(response.data);
  };

  return (
    <div className="w-full h-full lg:pl-16 pl-8 pt-8 pr-8 bg-white flex justify-between flex-col">
      <form
        id="editUser"
        className="flex flex-col gap-4 w-full h-0"
        onSubmit={handleUpdateUser}
      >
        <h1 className="text-primary text-3xl font-semibold">Perfil</h1>
        <div className="flex-col">
          <div className="flex gap-8 mb-6">
            <Input
              placeholder={userInfo?.name || ""}
              className="placeholder:text-neutral-800"
              name="name"
              type="text"
              value={userData.name || ""}
              onChange={handleChange}
            />
            <Input
              placeholder={userInfo?.email || ""}
              className="placeholder:text-neutral-800"
              name="email"
              type="email"
              value={userData.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-8">
            <Input
              placeholder="Senha"
              name="password"
              type="password"
              value={userData.password || ""}
              onChange={handleChange}
            />
            <Input
              placeholder="Senha"
              name="confirmPassword"
              type="password"
              value={userData.confirmPassword || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex gap-6">
          <Button
            type="button"
            text="Cancelar"
            color="neutral"
            onClick={() => {
              navigate("/");
            }}
          />
          <Button type="submit" text="Salvar alterações" color="primary" />
          {message && <p className="">{message}</p>}
        </div>
        <span className="mt-1">
          <Button
            type="button"
            text="Excluir Conta"
            color="error"
            onClick={() => handleDeleteUser()}
          />
        </span>
      </form>
    </div>
  );
}
