import React, { createContext, ReactNode, useState } from "react";
import api from "../services/api.js";

export interface Task {
  _id: string;
  taskListId: string;
  title: string;
  isCompleted: boolean;
}

export interface TaskParams {
  taskListId: string;
  title: string;
  isCompleted: boolean;
}

export interface TaskList {
  _id: string;
  userId: string;
  name: string;
}

export interface TaskListParams {
  name: string;
}

interface ApiContextType {
  request: string | null;
  getTaskLists: () => Promise<TaskList[] | undefined>;
  getTasks: (taskListId: string) => Promise<Task[] | undefined>;
  postTask: (taskData: TaskParams) => any;
  postTaskList: (taskList: TaskListParams) => Promise<TaskList | undefined>;
  updateTaskList: (
    taskList: TaskListParams,
    taskListId: string
  ) => Promise<TaskList | undefined>;
  updateTask: (
    task: TaskParams,
    taskId: string
  ) => Promise<TaskList | undefined>;
  deleteTask: (taskId: string) => Promise<Task | undefined>;
  deleteTaskList: (taskListId: string) => Promise<TaskList | undefined>;
}

export const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [request, setRequest] = useState<"get" | "update" | null>(null);

  api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    console.log(
      "peguei o token: ",
      token && JSON.parse(token),
      sessionStorage.getItem("user")
    );

    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  });

  const getTaskLists = async () => {
    try {
      const response = await api.get("/task-list/");
      setRequest("get");
      return (await response.data) as TaskList[];
    } catch (error: any) {}
  };

  const postTaskList = async (taskListData: TaskListParams) => {
    try {
      const response = await api.post("/task-list/", taskListData);
      setRequest("update");
      return (await response.data) as TaskList;
    } catch (error: any) {}
  };

  const updateTaskList = async (
    taskListData: TaskListParams,
    taskListId: string
  ) => {
    try {
      const response = await api.patch(
        `/task-list/${taskListId}`,
        taskListData
      );
      return await response.data;
    } catch (error: any) {}
  };

  const deleteTaskList = async (taskListId: string) => {
    try {
      const response = await api.delete(`/task-list/${taskListId}`);
      setRequest("update");
      return (await response.data) as TaskList;
    } catch (error: any) {}
  };

  const getTasks = async (taskListId: string) => {
    try {
      const response = await api.get(`/task/${taskListId}`);
      const tasks = await response.data;
      return await tasks;
    } catch (error: any) {}
  };

  const updateTask = async (
    taskData: TaskParams,
    taskId: string
  ) => {
    try {
      const response = await api.patch(
        `/task/${taskId}`,
        taskData
      );
      return await response.data;
    } catch (error: any) {}
  };

  const postTask = async (taskListData: TaskParams) => {
    try {
      const response = await api.post("/task/", {
        title: taskListData.title,
        taskListId: taskListData.taskListId,
        isCompleted: false,
      });
      const taskList = await response;
      return taskList;
    } catch (error: any) {}
  };

  const deleteTask = async (taskId: string) => {
    try {
      const response = await api.delete(`/task/${taskId}`);
      return (await response.data) as Task;
    } catch (error: any) {}
  };

  return (
    <ApiContext.Provider
      value={{
        request,
        getTaskLists,
        getTasks,
        postTask,
        deleteTask,
        postTaskList,
        updateTaskList,
        updateTask,
        deleteTaskList,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
