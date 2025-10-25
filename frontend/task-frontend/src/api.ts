import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000",
  timeout: 5000,
});

export type TaskItem = {
  id: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
};

export const getTasks = async (): Promise<TaskItem[]> => {
  const r = await api.get<TaskItem[]>("/api/tasks");
  return r.data;
};

export const addTask = async (description: string): Promise<TaskItem> => {
  const r = await api.post<TaskItem>("/api/tasks", { description });
  return r.data;
};

export const toggleTask = async (id: string) => {
  await api.put(`/api/tasks/${id}/toggle`);
};

export const deleteTask = async (id: string) => {
  await api.delete(`/api/tasks/${id}`);
};

export default api;
