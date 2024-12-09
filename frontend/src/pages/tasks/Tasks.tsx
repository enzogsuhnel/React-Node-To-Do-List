import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Button from "../../components/button/Button";
import { ApiContext, Task, TaskList } from "../../context/ApiContext";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import { User, UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";

export default function Tasks() {
  const location = useLocation();
  const navigate = useNavigate();

  const taskList: TaskList = location.state?.taskList || null;
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareTaskModalOpen, setIsShareTaskModalOpen] = useState(false);
  const [usersToShare, setUsersToShare] = useState<User[]>();
  const [newTask, setNewTask] = useState("");

  const [listTitle, setListTitle] = useState<string>("");
  const [list, setList] = useState<boolean>(false);

  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);
  const [usersShared, setUsersShared] = useState<User[]>();

  const notifySuccess = (msg: string) => toast.success(msg);
  const notifyError = (msg: string) => toast.error(msg);

  // Context
  const apiContext = useContext(ApiContext);
  const userContext = useContext(UserContext);

  if (!apiContext || !userContext) {
    return null;
  }

  const {
    getTasks,
    postTask,
    postTaskList,
    deleteTask,
    deleteTaskList,
    updateTaskList,
    updateTask,
    shareTaskList,
    unshareTaskList,
    getSharedUsers,
    unfollowTaskList,
  } = apiContext;

  const { user, getUsersToShare } = userContext;

  const isSharedTaskList =
    taskList &&
    taskList.userId?.name != undefined &&
    taskList?.userId?._id != user?._id;

  const getTasksFromTaskList = async () => {
    const tasks = await getTasks(taskList._id);
    setTasks(tasks);
  };

  const handleGetUsersToShare = async () => {
    const usersToShare = await getUsersToShare();
    setUsersToShare(usersToShare);
    setIsShareTaskModalOpen(true);
  };

  const handleUnshareTaskList = async (userIdToUnshare: string) => {
    try {
      const taskListUpdated = await unshareTaskList(
        taskList._id,
        userIdToUnshare
      );
      navigate("/task-list", { state: { taskList: taskListUpdated } });
      notifySuccess("Lista descompartilhada com sucesso!");
    } catch (error) {
      notifyError("Erro ao descompartilhar lista!");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };
  const handleToggleDropdown = () => {
    setIsDropOpen(!isDropOpen);
  };
  const handleUnfollowTaskList = async () => {
    try {
      const taskListUnfollowed =
        user && (await unfollowTaskList(taskList._id, taskList.userId._id));

      navigate("/task-list", { state: { taskList: null } });
      notifySuccess("Deixou de seguir lista com sucesso!");
      return taskListUnfollowed;
    } catch {
      notifyError("Erro ao deixar de seguir lista!");
    }
  };
  const handleCreateTask = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskList) {
      try {
        await postTask({
          taskListId: taskList._id,
          title: newTask,
          isCompleted: false,
        });
        setNewTask("");
        getTasksFromTaskList();
      } catch (error: any) {}
    }
  };

  const handleCreateTaskList = async () => {
    try {
      if (listTitle?.trim() != "") {
        const newTaskList = await postTaskList({ name: listTitle.trim() });
        navigate("/task-list", { state: { taskList: newTaskList } });
      }
    } catch (error) {}
  };

  const handleUpdateTaskList = async () => {
    try {
      if (listTitle?.trim() != "") {
        const newTaskList = await updateTaskList(
          { name: listTitle.trim() },
          taskList._id
        );
      }
    } catch (error) {}
  };

  const handleUpdateTask = async (
    taskId: string,
    taskParams: { title?: string; isCompleted: boolean }
  ) => {
    try {
      await updateTask(
        {
          taskListId: "",
          title: taskParams.title || "",
          isCompleted: taskParams.isCompleted,
        },
        taskId
      );
      await getTasksFromTaskList();
    } catch (error) {}
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    getTasksFromTaskList();
  };

  const handleDeleteTaskList = async () => {
    deleteTaskList(taskList._id);
    setTasks(undefined);

    navigate("/task-list", { state: { taskList: null } });
  };

  const [selectedUsersToShare, setSelectedUsersToShare] = useState<string[]>(
    []
  );

  const handleCheckboxChange = (userId: string) => {
    setSelectedUsersToShare((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  // Função para enviar o formulário
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const taskListUpdated = await shareTaskList(
        taskList._id,
        selectedUsersToShare
      );
      if (taskListUpdated) {
        navigate("/task-list", { state: { taskList: taskListUpdated } });
      } else {
        throw new Error("Erro ao atualizar a lista de compartilhamento");
      }
    } catch (error) {
      notifyError("Erro ao compartilhar lista! Tente novamente.");
    }
    setIsShareTaskModalOpen(false);
  };

  const handleGetSharedUsers = async () => {
    const sharedUsers = await getSharedUsers(taskList._id);

    sharedUsers && setUsersShared(sharedUsers);
  };

  useEffect(() => {
    taskList && getTasksFromTaskList();
    setListTitle(taskList ? taskList.name : "");
    handleGetSharedUsers();
  }, [taskList]);

  return (
    <div className="w-full h-full lg:pl-16 pl-8 pt-8 pr-8 bg-neutral-50 flex justify-between flex-wrap">
      <div className="lg:w-[60%] w-full">
        {!list ? (
          <div className="flex justify-between">
            <div className="flex relative w-fit">
              <input
                placeholder="Nova lista"
                className={`bg-transparent  ${
                  !isSharedTaskList && "border-b-2 border-b-neutral-400"
                } placeholder:text-neutral-400 focus:outline-none text-neutral-800 text-3xl pb-2`}
                disabled={isSharedTaskList}
                value={listTitle}
                onChange={(e) => {
                  setListTitle(e.target.value);
                }}
              />
              {!isSharedTaskList && (
                <Button
                  startIcon={taskList ? "edit" : "save"}
                  variant="text"
                  onClick={() => {
                    taskList ? handleUpdateTaskList() : handleCreateTaskList();
                  }}
                />
              )}
              <div className="relative">
                <Button
                  startIcon="more_vert"
                  variant="text"
                  onClick={handleToggleDropdown}
                />

                {isDropOpen && (
                  <div className="flex flex-col min-w-40 absolute right-0 top-16 shadow-md md:-right-44 md:-top-2 bg-white">
                    {!isSharedTaskList ? (
                      <>
                        <Button
                          text="Excluir lista"
                          color="error"
                          onClick={() => {
                            setIsModalOpen(true);
                          }}
                        />
                        <Button
                          text="Compartilhar"
                          color="lightNeutral"
                          onClick={handleGetUsersToShare}
                        />
                      </>
                    ) : (
                      <Button
                        text="Deixar de seguir lista"
                        color="lightNeutral"
                        onClick={handleUnfollowTaskList}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            {isSharedTaskList && (
              <div
                className="flex gap-4 items-center 
        px-3 py-2 "
              >
                <div className="flex items-center justify-center rounded-full p-2 bg-teal-600 w-10 h-10">
                  <p className="font-semibold text-xl text-white">
                    {taskList?.userId?.name[0]}
                  </p>
                </div>
                <h2 className="font-semibold">{taskList?.userId?.name}</h2>
              </div>
            )}
          </div>
        ) : (
          <h1 className="text-white text-lg">{listTitle}</h1>
        )}

        <div className="mt-10">
          {!isSharedTaskList && (
            <form
              onSubmit={handleCreateTask}
              className={`${
                taskList ? "bg-[#dbe7e6]" : "bg-neutral-200"
              }  rounded-lg overflow-hidden text-lg flex gap-2 items-center justify-between`}
            >
              <div className="flex gap-4 items-center py-2 px-4">
                <input type="checkbox" name="" className="scale-125" disabled />
                <input
                  placeholder="Nova tarefa"
                  disabled={taskList == null}
                  className="bg-transparent border-b border-b-neutral-400 placeholder:text-neutral-600 focus:outline-none text-neutral-800 text-lg "
                  name="title"
                  value={newTask}
                  onChange={handleChange}
                />
              </div>
              <Button
                startIcon="add"
                color={taskList ? "tertiary" : "neutral"}
                type="submit"
                customclass="h-12"
              />
            </form>
          )}

          {tasks && taskList && (
            <div className="overflow-auto h-[70vh] my-8">
              <div className="flex flex-col gap-2">
                {[...tasks]
                  .reverse()
                  .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
                  .map((task, index) => (
                    <div
                      className="bg-container rounded-lg overflow-hidden text-lg flex gap-2 items-center justify-between"
                      key={index}
                    >
                      <div className="flex gap-4 items-center py-2 px-4">
                        <input
                          type="checkbox"
                          disabled={isSharedTaskList}
                          name=""
                          checked={task.isCompleted}
                          id={`${index}`}
                          onChange={(e) => {
                            handleUpdateTask(task._id, {
                              isCompleted: e.target.checked,
                            });
                          }}
                          className="scale-125 accent-tertiary"
                        />
                        <label
                          className={`w-full block text-lg ${
                            task.isCompleted && "line-through"
                          }`}
                          htmlFor={`${index}`}
                        >
                          {task.title}
                        </label>
                      </div>
                      {!isSharedTaskList && (
                        <div className="flex">
                          <Button
                            startIcon="close"
                            color="neutral"
                            onClick={() => {
                              handleDeleteTask(task._id);
                            }}
                            customclass="h-12"
                          />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {!isSharedTaskList && (
        <div className="bg-container lg:w-[30%] lg:max-w-[450px] w-full ml-4 rounded-xl p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Compartilhado com:</h2>
            <Button
              endIcon="share"
              variant="text"
              onClick={handleGetUsersToShare}
            />
          </div>
          <div className="mt-8 flex flex-col gap-2">
            {usersShared?.map((user, index) => (
              <div
                className="flex items-center justify-between w-full"
                key={index}
              >
                <div className="flex gap-4 items-center px-3 py-">
                  <div className="flex items-center justify-center rounded-full p-2 bg-teal-600 w-10 h-10">
                    <p className="font-semibold text-xl text-white">
                      {user.name[0]}
                    </p>
                  </div>
                  <label className="font-semibold">{user.name}</label>
                </div>
                <Button
                  endIcon="cancel"
                  variant="text"
                  onClick={() => handleUnshareTaskList(user._id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        color="error"
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          handleDeleteTaskList(), setIsModalOpen(false);
        }}
        message="Tem certeza de que deseja excluir essa lista?"
        effectMessage="Esta ação não pode ser desfeita."
      />

      {usersToShare && (
        <Modal
          isOpen={isShareTaskModalOpen}
          color="primary"
          message={
            <div>
              <form onSubmit={handleSubmit}>
                {usersToShare.map((user) => (
                  <div key={user._id}>
                    <label className="flex gap-4">
                      <input
                        type="checkbox"
                        value={user._id}
                        className="scale-125 accent-tertiary"
                        onChange={() => handleCheckboxChange(user._id)}
                      />
                      {user.email}
                    </label>
                  </div>
                ))}
                <div className="mt-6 flex justify-end space-x-4">
                  <Button
                    onClick={() => setIsShareTaskModalOpen(false)}
                    color={"lightNeutral"}
                    text="Cancelar"
                  />
                  <Button type="submit" color={"primary"} text="Compartilhar" />
                </div>
              </form>
            </div>
          }
        />
      )}
    </div>
  );
}
