import { FC } from "react";
import axios from "axios";

type User = {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  telefone: string;
  senha: string;
};

interface DeleteModalProps {
  user: User;
  closeModals: () => void;
  refreshUsers: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({ user, closeModals, refreshUsers }) => {
  const handleConfirmDelete = async () => {
    try {
      const responseDel = await axios.delete(`http://localhost/api/usuario/${user.id}`);
      if (responseDel.status === 204) {
        console.log("Usuário deletado com sucesso.");
        refreshUsers(); // Recarrega os usuários após a exclusão
      }
    } catch (error: any) {
      console.error(
        "Erro ao deletar usuário:",
        error.response?.data?.message || error.message
      );
    } finally {
      closeModals(); // Fecha o modal após a tentativa de exclusão
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-lg font-bold mb-4 text-black">Tem certeza que deseja excluir?</h2>
        <div className="flex justify-end gap-2">
          <button
            onClick={closeModals}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Não
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
