import axios from "axios";

const API_BASE = "https://68ec0f18eff9ad3b140135d6.mockapi.io/data";

export interface TodoItem {
  id: number | string;
  todo: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
}

export const getTodos = async (): Promise<TodoItem[]> => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const addTodo = async (
  todo: Omit<TodoItem, "id">
): Promise<TodoItem> => {
  const res = await axios.post(API_BASE, todo, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const updateTodo = async ({
  id,
  data,
}: {
  id: number | string,
  data: Partial<TodoItem>,
}): Promise<TodoItem> => {
  const res = await axios.put(`${API_BASE}/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const deleteTodo = async (id: number | string): Promise<TodoItem> => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};
