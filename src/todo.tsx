import React, { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, addTodo, deleteTodo, updateTodo } from "./useTodos";
import Card from "./card";

interface TodoItem {
  id: number | string;
  todo: string;
  name?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const Todo: React.FC = () => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [editing, setEditing] = useState<TodoItem | null>(null);

  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery<TodoItem[], Error>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = inputRef.current?.value.trim();
    if (!name) return;

    if (editing) {
      updateMutation.mutate({
        id: editing.id,
        data: { todo: name, completed: editing.completed },
      });
      setEditing(null);
    } else {
      addMutation.mutate({ todo: name, completed: false, userId: 5 });
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  const total = todos.length;
  const doneCount = todos.filter((t) => t.completed).length;
  const percent = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Xato: {error.message}</p>
    );

  return (
    <div className="w-[60%] m-auto mt-10 p-5 border border-gray-400 rounded">
      <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="Yangi todo..."
          className="flex-1 border border-gray-300 p-2 rounded"
        />
        <button className="bg-black text-white px-4 py-2 rounded">
          {editing ? "Save" : "Add"}
        </button>
      </form>

      <div className="mb-4">
        <div className="text-sm mb-1">
          Progress: {doneCount}/{total} ({percent}%)
        </div>
        <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
          <div
            style={{ width: `${percent}%` }}
            className="h-full bg-green-500 transition-all"
          />
        </div>
      </div>

      {todos.length === 0 ? (
        <p className="text-gray-500">Vazifalar topilmadi</p>
      ) : (
        todos.map((item) => (
          <Card
            key={item.id}
            name={item.todo || item.name || ""}
            createdTime={item.createdAt}
            editedTime={item.updatedAt}
            id={item.id}
            done={item.completed}
            deleteTodo={() => deleteMutation.mutate(item.id)}
            editTodo={() => {
              if (inputRef.current)
                inputRef.current.value = item.todo || item.name || "";
              setEditing(item);
            }}
            toggleTodo={() => {
              updateMutation.mutate({
                id: item.id,
                data: {
                  completed: !item.completed,
                  todo: item.todo || item.name || "",
                },
              });
            }}
          />
        ))
      )}
    </div>
  );
};

export default Todo;
