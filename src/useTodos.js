import axios from "axios";

const API_BASE = "https://68ec0f18eff9ad3b140135d6.mockapi.io/data";

export const getTodos = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const addTodo = async (todo) => {
  const res = await axios.post(API_BASE, todo, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const updateTodo = async ({ id, data }) => {
  const res = await axios.put(`${API_BASE}/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};  
