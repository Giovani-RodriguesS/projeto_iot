'use client';
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import EditModal from "@/components/EditModal";
import DeleteModal from "@/components/DeleteModal";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleEdit = () => setShowEditModal(true);
  const handleDelete = () => setShowDeleteModal(true);
  const closeModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5257/api/usuario');
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-slate-800 h-full">
        <Header title="Usuários" username="Letícia Anhaia" />
        <Navbar />
        <main className="w-full max-w-7xl mx-auto px-5 py-7">
          <div className="flex flex-wrap justify-center gap-5 mt-2">
            {users.map((user) => (
              <div key={user.id} className="p-4 bg-white rounded-xl w-48 flex flex-col items-center">
                <Image
                  src="/images/profiles/user.jpg"
                  width={80}
                  height={80}
                  className="mb-3 rounded-full"
                  alt={user.nome}  
                />
                <div className="text-lg font-bold text-black">{user.nome}</div>
                <div className="text-sm text-black">Cargo: {user.cargo}</div>
                <div className="text-sm text-black">ID: {user.id}</div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={handleEdit}
                    className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300"
                  >Editar</button>

                  <button
                    onClick={handleDelete}
                    className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300"
                  >Remover</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
