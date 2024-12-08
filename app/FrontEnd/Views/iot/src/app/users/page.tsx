"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { UserCard } from "@/components/CardUsers";
import EditModal from "@/components/EditModal";
import DeleteModal from "@/components/DeleteModal";

type User = {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  telefone: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentEditUser, setCurrentEditUser] = useState<User | null>(null);
  const [currentDeleteUser, setCurrentDeleteUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost/api/usuario");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => setCurrentEditUser(user);
  const handleDelete = (user: User) => setCurrentDeleteUser(user);

  const closeModals = () => {
    setCurrentEditUser(null);
    setCurrentDeleteUser(null);
  };

  return (
    <div className="flex h-screen sm:overflow-hidden">
      <div className="flex-1 h-full bg-white dark:bg-slate-800 text-black dark:text-white">
        <Header title="Irrigação Smart" username="Usuário" />
        <Navbar />
        <main className="w-full max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-5 mt-4">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={() => handleEdit(user)}
                onDelete={() => handleDelete(user)}
              />
            ))}
          </div>
        </main>
      </div>

      {currentEditUser && (
        <EditModal user={currentEditUser} closeModals={closeModals} />
      )}
      {currentDeleteUser && (
        <DeleteModal user={currentDeleteUser} closeModals={closeModals} />
      )}
    </div>
  );
}
