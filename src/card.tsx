import React from "react";

interface CardProps {
  id: number | string;
  name: string;
  createdTime?: string;
  editedTime?: string;
  done: boolean;
  deleteTodo: (id: number | string) => void;
  editTodo: (todo: { id: number | string; name: string }) => void;
  toggleTodo: () => void;
}

const Card: React.FC<CardProps> = ({
  name,
  createdTime,
  editedTime,
  id,
  done,
  deleteTodo,
  editTodo,
  toggleTodo,
}) => {
  return (
    <form className="flex justify-between border border-gray-700 p-2 mb-5 rounded text-gray-600 bg-amber-50">
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={!!done}
          onChange={toggleTodo}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
        />
        <div>
          <h1 className={`${done ? "line-through text-gray-400" : ""}`}>{name}</h1>
          <div className="flex gap-3 text-[11px] text-gray-500">
            {createdTime && <p>Created: {createdTime}</p>}
            {editedTime && <p>Edited: {editedTime}</p>}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => editTodo({ id, name })}
          className="px-5 bg-amber-100 border-hidden"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => deleteTodo(id)}
          className="px-5 bg-amber-100 border-hidden"
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default Card;
