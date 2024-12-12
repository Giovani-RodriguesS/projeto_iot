import axios from "axios";

type User = {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  telefone: string;
  senha: string;
};

interface EditModalProps {
  user: User;
  closeModals: () => void;
  refreshUsers: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ user, closeModals, refreshUsers }) => {
  const handleConfirmUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost/api/usuario/${user.id}`, {
        nome: user.nome,
        email: user.email,
        cargo: user.cargo,
        telefone: user.telefone,
        senha: user.senha,
      });
      if (response.status === 204) {
        console.log("Usuário modificado.");
        refreshUsers(); // Atualiza a lista de usuários
        alert("Usuário atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
    } finally {
      closeModals(); // Fecha o modal após a tentativa de atualização
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg w-80 text-black">
        <h2 className="text-lg font-bold mb-4">Editar Informações</h2>
        <input
          type="text"
          defaultValue={user.nome}
          placeholder="Nome"
          className="mb-2 p-2 border w-full rounded"
          onChange={(e) => (user.nome = e.target.value)}
        />
        <input
          type="text"
          defaultValue={user.cargo}
          placeholder="Cargo"
          className="mb-2 p-2 border w-full rounded"
          onChange={(e) => (user.cargo = e.target.value)}
        />
        <input
          type="email"
          defaultValue={user.email}
          placeholder="Email"
          className="mb-4 p-2 border w-full rounded"
          onChange={(e) => (user.email = e.target.value)}
        />
        <input
          type="text"
          defaultValue={user.telefone}
          placeholder="Telefone"
          className="mb-4 p-2 border w-full rounded"
          onChange={(e) => (user.telefone = e.target.value)}
        />
        <input
          type="password"
          defaultValue={user.senha}
          placeholder="Senha"
          className="mb-4 p-2 border w-full rounded"
          onChange={(e) => (user.senha = e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={closeModals}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmUpdate}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
