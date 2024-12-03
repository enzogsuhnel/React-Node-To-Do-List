import React, { createContext, ReactNode, useState } from "react";
import api from "../services/api.js";

export interface Task {
  _id: string,
  taskListId: string,
  title: string,
  isCompleted: boolean,
}

export interface TaskParams {
  taskListId: string,
  title: string,
  isCompleted: boolean,
}

export interface TaskList {
  _id: string,
  userId: string,
  name: string
}

export interface TaskListParams {
  name: string
}

interface ApiContextType {
  request: string;
  getTaskLists: () => Promise<TaskList[] | undefined>;
  getTasks: (taskListId: string) => Promise<Task[] | undefined>;
  postTask: (taskData: TaskParams) => any,
  postTaskList: (taskList: TaskListParams) => Promise<TaskList | undefined>;
  deleteTask: (taskId: string) => Promise<Task | undefined>;
  deleteTaskList: (taskListId: string) => Promise<TaskList | undefined>;
}

export const ApiContext = createContext<ApiContextType | undefined>(
  undefined
);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [request, setRequest] = useState<"success"|"error">("success");

  api.interceptors.request.use((config) => {
    const user = sessionStorage.getItem('user');
    const token = user && JSON.parse(user).token
    console.log('peguei o token: ',token);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const getTaskLists = async () => {
    try {
      const response = await api.get("/task-list/");
      setRequest('success')
      return response.data as TaskList[]
    } catch (error: any) {

    }
  }

  const postTaskList = async (taskListData: TaskListParams) => {
    try {
      const response = await api.post("/task-list/", taskListData);
      return response.data as TaskList
    } catch (error: any) {

    }
  }

  const deleteTaskList = async (taskListId: string) => {
    try {
      const response = await api.delete(`/task-list/${taskListId}`);
      setRequest('success')
      return response.data as TaskList
    } catch (error: any) {

    }
  }

  const getTasks = async (taskListId: string) => {
    try {
      const response = await api.get(`/task/${taskListId}`);
      const tasks = await response.data
      return tasks
    } catch (error: any) {

    }
  }

  const postTask = async (taskListData: TaskParams) => {
    try {
      const response = await api.post("/task/", {
        title: taskListData.title,
        taskListId: taskListData.taskListId,
        isCompleted: false
      });
      return response
    } catch (error: any) {

    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      const response = await api.delete(`/task/${taskId}`);
      return response.data as Task
    } catch (error: any) {

    }
  }

  return (
    <ApiContext.Provider
      value={{
        request,
        getTaskLists,
        getTasks,
        postTask,
        deleteTask,
        postTaskList,
        deleteTaskList
      }}>
      {children}
    </ApiContext.Provider>
  );
};
