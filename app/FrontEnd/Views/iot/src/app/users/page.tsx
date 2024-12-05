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
    <div className="flex h-screen sm:overflow-hidden">
      <div className="flex-1 h-full bg-white dark:bg-slate-800 text-black dark:text-white">
        <Header title="Usuários" username="Letícia Anhaia" />
        <Navbar />
        <main className="w-full max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-5 mt-4">

            {/* div do meu funcionário Luciano */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/users/user1.jpg" width={70} height={70} className="mb-3 rounded-full" alt="Luciano" />
              <div className="text-lg font-bold text-black dark:text-gray-900">Luciano</div>
              <div className="text-sm text-black dark:text-gray-900">Desenvolvedor</div>
              <div className="text-sm text-black dark:text-gray-900">ID: 001233</div>
              <div className="text-sm text-black dark:text-gray-900 font-bold">Tecnologia</div>
              <div className="text-sm text-black dark:text-gray-900">luciano@gmail.com</div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleEdit} className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>

              {showEditModal && <EditModal closeModals={closeModals} />}
              {showDeleteModal && <DeleteModal closeModals={closeModals} />}
            </div>

            {/* div do meu funcionário Roberto */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/users/user2.jpg" width={70} height={70} className="mb-3 rounded-full" alt="Roberto" />
              <div className="text-lg font-bold text-black">Roberto</div>
              <div className="text-sm text-black">Gerente de Produção</div>
              <div className="text-sm text-black">ID: 001234</div>
              <div className="text-sm text-black font-bold">Produção</div>
              <div className="text-sm text-black">roberto@gmail.com</div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleEdit} className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>

              {showEditModal && <EditModal closeModals={closeModals} />}
              {showDeleteModal && <DeleteModal closeModals={closeModals} />}
            </div>

            {/* div da minha funcionária Bruna */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/users/user3.jpg" width={70} height={70} className="mb-3 rounded-full" alt="Bruna" />
              <div className="text-lg font-bold text-black">Bruna</div>
              <div className="text-sm text-black">Engª de Processos</div>
              <div className="text-sm text-black">ID: 001235</div>
              <div className="text-sm text-black font-bold">Engenharia</div>
              <div className="text-sm text-black">bruna@gmail.com</div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleEdit} className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>

              {showEditModal && <EditModal closeModals={closeModals} />}
              {showDeleteModal && <DeleteModal closeModals={closeModals} />}
            </div>

            {/* div da minha funcionária Giseli */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/users/user4.jpg" width={70} height={70} className="mb-3 rounded-full" alt="Giseli" />
              <div className="text-lg font-bold text-black">Giseli</div>
              <div className="text-sm text-black">Superv. de Qualidade</div>
              <div className="text-sm text-black">ID: 001236</div>
              <div className="text-sm text-black font-bold">Qualidade</div>
              <div className="text-sm text-black">giseli@gmail.com</div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleEdit} className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>

              {showEditModal && <EditModal closeModals={closeModals} />}
              {showDeleteModal && <DeleteModal closeModals={closeModals} />}
            </div>

            {/* div da minha funcionária Luana */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/users/user5.jpg" width={70} height={70} className="mb-3 rounded-full" alt="Luana" />
              <div className="text-lg font-bold text-black">Luana</div>
              <div className="text-sm text-black">Assistente Administrativo</div>
              <div className="text-sm text-black">ID: 001237</div>
              <div className="text-sm text-black font-bold">Manutenção</div>
              <div className="text-sm text-black">luana@gmail.com</div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleEdit} className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>

              {showEditModal && <EditModal closeModals={closeModals} />}
              {showDeleteModal && <DeleteModal closeModals={closeModals} />}
            </div>

            {/* div do meu funcionário Lucas */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/users/user6.jpg" width={70} height={70} className="mb-3 rounded-full" alt="Lucas" />
              <div className="text-lg font-bold text-black">Lucas</div>
              <div className="text-sm text-black">Analista de Logística</div>
              <div className="text-sm text-black">ID: 001238</div>
              <div className="text-sm text-black font-bold">Logística</div>
              <div className="text-sm text-black">lucas@gmail.com</div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleEdit} className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>

              {showEditModal && <EditModal closeModals={closeModals} />}
              {showDeleteModal && <DeleteModal closeModals={closeModals} />}
            </div>

            {/* div da minha funcionária Letícia */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/users/user7.png" width={70} height={70} className="mb-3 rounded-full" alt="Letícia" />
              <div className="text-lg font-bold text-black">Letícia</div>
              <div className="text-sm text-black">Coord. de Projetos</div>
              <div className="text-sm text-black">ID: 001239</div>
              <div className="text-sm text-black font-bold">Projetos</div>
              <div className="text-sm text-black">leticia@gmail.com</div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleEdit} className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>

              {showEditModal && <EditModal closeModals={closeModals} />}
              {showDeleteModal && <DeleteModal closeModals={closeModals} />}
            </div>

            {/* div do meu funcionário Gabriel */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/users/user8.png" width={70} height={70} className="mb-3 rounded-full" alt="Gabriel" />
              <div className="text-lg font-bold text-black">Gabriel</div>
              <div className="text-sm text-black">Designer de Produto</div>
              <div className="text-sm text-black">ID: 001240</div>
              <div className="text-sm text-black font-bold">Design</div>
              <div className="text-sm text-black">gabriel@gmail.com</div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleEdit} className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>

              {showEditModal && <EditModal closeModals={closeModals} />}
              {showDeleteModal && <DeleteModal closeModals={closeModals} />}
            </div>

            {/* div do meu funcionário Rafael */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/users/user9.png" width={70} height={70} className="mb-3 rounded-full" alt="Rafael" />
              <div className="text-lg font-bold text-black">Rafael</div>
              <div className="text-sm text-black">Operador de Máquinas</div>
              <div className="text-sm text-black">ID: 001241</div>
              <div className="text-sm text-black font-bold">Produção</div>
              <div className="text-sm text-black">rafael@gmail.com</div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleEdit} className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>
              {showEditModal && <EditModal closeModals={closeModals} />}
              {showDeleteModal && <DeleteModal closeModals={closeModals} />}
            </div>

            {/* div da minha funcionária Aline */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/users/user10.png" width={70} height={70} className="mb-3 rounded-full" alt="Aline" />
              <div className="text-lg font-bold text-black">Aline</div>
              <div className="text-sm text-black">Assistente de Vendas</div>
              <div className="text-sm text-black">ID: 001242</div>
              <div className="text-sm text-black font-bold">Vendas</div>
              <div className="text-sm text-black">aline@gmail.com</div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleEdit} className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>
              {showEditModal && <EditModal closeModals={closeModals} />}
              {showDeleteModal && <DeleteModal closeModals={closeModals} />}
            </div>
          </div>
          </main >
      </div>
    </div>
        
  );
}
