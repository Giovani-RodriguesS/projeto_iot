import React from "react";

type UserCardProps = {
  user: {
    id: number;
    nome: string;
    email: string;
    cargo: string;
    telefone: string;
  };
  onEdit: () => void;
  onDelete: () => void;
};

export const UserCard = ({ user, onEdit, onDelete }: UserCardProps) => (
  <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-60 flex flex-col items-center shadow-md">
    <div className="mb-3 rounded-full bg-blue-500 text-white w-14 h-14 flex items-center justify-center text-xl font-bold">
      {user.nome[0]?.toUpperCase()}
    </div>
    <div className="text-lg font-bold text-black dark:text-black">{user.nome}</div>
    <div className="text-sm text-gray-700 dark:text-black">Cargo: {user.cargo}</div>
    <div className="text-sm text-gray-700 dark:text-black">ID: {user.id}</div>
    <div className="text-sm text-gray-700 dark:text-black">{user.email}</div>
    <div className="mt-4 flex gap-2">
      <button
        onClick={onEdit}
        className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-600 transition duration-300"
      >
        Editar
      </button>
      <button
        onClick={onDelete}
        className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300"
      >
        Remover
      </button>
    </div>
  </div>
);
