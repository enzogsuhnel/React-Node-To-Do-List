import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Button from "../../components/button/Button";
import { ApiContext, Task, TaskList } from "../../context/ApiContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Tasks() {
  const location = useLocation();
  const navigate = useNavigate()

  const taskList: TaskList = location.state?.taskList || null;

  const [newTask, setNewTask] = useState("");

  const [listTitle, setListTitle] = useState<string>("");
  const [list, setList] = useState<boolean>(false);

  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);
  const [usersShared, setUsersShared] = useState<string[]>(['Stephanie C.', 'Enzo G.']);

  // Context
  const apiContext = useContext(ApiContext);

  if (!apiContext) {
    return null;
  }

  const { getTasks, postTask, postTaskList, deleteTask, deleteTaskList } = apiContext;

  const getTasksFromTaskList = async () => {
    const tasks = await getTasks(taskList._id)
    setTasks(tasks)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value)
  };

  const handleCreateTask = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (taskList) {
      try {
        await postTask({ taskListId: taskList._id, title: newTask, isCompleted: false })
        setNewTask("")
        getTasksFromTaskList()
      } catch (error: any) {
      }
    }
  };

  const handleCreateTaskList = async () => {
    try {
      if (listTitle?.trim() != "") {
        const newTaskList = await postTaskList({ name: listTitle })
        navigate('/task-list', { state: { taskList: newTaskList } })
      }
    } catch (error) {
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId)
    getTasksFromTaskList()
  }

  const handleDeleteTaskList = async () => {
    deleteTaskList(taskList._id)
    setTasks(undefined)
    navigate('/task-list', { state: { taskList: null } })
  }

  useEffect(() => {
    taskList && getTasksFromTaskList()
    return (
      setListTitle("")
    )
  }, [taskList])

  return (
    <div className="w-full h-full lg:pl-16 pl-8 pt-8 pr-8 bg-neutral-50 flex justify-between flex-wrap">
      <div className="lg:w-[60%] w-full">
        {!list ? (
          <div className="flex relative w-fit">
            <input
              placeholder="Nova lista"
              className="bg-transparent border-b-2 border-b-neutral-400 placeholder:text-neutral-400 focus:outline-none text-neutral-800 text-3xl pb-2"
              value={taskList?.name || listTitle}
              onChange={(e) => {
                setListTitle(e.target.value.trim());
              }}
            />
            <Button
              startIcon="edit"
              variant="text"
              onClick={() => {
                handleCreateTaskList()
              }}
            />
            <Button
              startIcon="more_vert"
              variant="text"
              onClick={() => {
                listTitle && setList(true);
              }}
            />
            <div className="flex flex-col w-44 absolute right-0 -bottom-20 md:-right-44 md:-top-2 md:bottom-0 shadow-md">
              <Button
                text="Excluir lista"
                color="error"
                onClick={() => {
                  handleDeleteTaskList()
                }}
              />
              <Button
                text="Compartilhar"
                color="lightNeutral"
                onClick={() => {
                  listTitle && setList(true);
                }}
              />
            </div>

          </div>
        ) : (
          <h1 className="text-white text-lg">{listTitle}</h1>
        )}

        <div className="mt-10">
          <form onSubmit={handleCreateTask}
            className={`${taskList ? "bg-[#dbe7e6]" : "bg-neutral-200"}  rounded-lg overflow-hidden text-lg flex gap-2 items-center justify-between`}>
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

          {tasks &&
            <div className="overflow-auto h-[70vh] my-8">
              <div className="flex flex-col gap-2">
                {[...tasks]
                  .reverse()
                  .map((task, index) => (
                    <div className="bg-container rounded-lg overflow-hidden text-lg flex gap-2 items-center justify-between" key={index}>
                      <div className="flex gap-4 items-center py-2 px-4">
                        <input type="checkbox" name="" id={`${index}`} className="scale-125 accent-tertiary" />
                        <label className="w-full block text-lg" htmlFor={`${index}`}>
                          {task.title}
                        </label>
                      </div>
                      <div className="flex">
                        <Button
                          startIcon="edit"
                          variant="text"
                          onClick={() => {
                            listTitle && setList(true);
                          }}
                          customclass="h-12"
                        />
                        <Button
                          startIcon="close"
                          color="neutral"
                          onClick={() => {
                            handleDeleteTask(task._id)
                          }}
                          customclass="h-12"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          }
        </div>
      </div>
      <div className="bg-container lg:w-[30%] lg:max-w-[450px] w-full ml-4 rounded-xl p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Compartilhado com:</h2>
          <span className="material-symbols-outlined cursor-pointer hover:text-neutral-300">
            share
          </span>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          {usersShared.map((user, index) => (
            <div
              className="flex items-center justify-between w-full" key={index}
            >
              <div className="flex gap-4 items-center px-3 py-">
                <div className="flex items-center justify-center rounded-full p-2 bg-teal-600 w-10 h-10">
                  <p className="font-semibold text-xl text-white">S
                  </p>
                </div>
                <label className="font-semibold">{user}</label>
              </div>
              <span className="material-symbols-outlined cursor-pointer ml-10">
                cancel
              </span>
            </div>
          ))}
        </div>

      </div>
    </div >
  );
}
