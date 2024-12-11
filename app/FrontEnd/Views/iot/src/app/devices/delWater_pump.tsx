import { FC } from "react";
import axios from "axios";

type BombaDevice = {
    id: number;
    nome: string;
    tipo: string;
    vazao: number;
    localizacao: string;
    data_instalacao: string;
  };

interface DeleteModalProps {
  bomba: BombaDevice;
  closeModals: () => void;
  refreshWater_pump: () => void;
}

const DelWater_pump: FC<DeleteModalProps> = ({closeModals, refreshWater_pump, bomba}) => {
  const handleConfirmDelete = async () => {
    try {
      const responseDelBomba = await axios.delete(`http://localhost/api/bomba/${bomba.id}`);
      if (responseDelBomba.status === 204) {
        console.log("Bomba deletado com sucesso.");
        refreshWater_pump();
      }
    } catch (error: any) {
      console.error(
        "Erro ao deletar bomba:",
        error.response?.data?.message || error.message
      );
    } finally {
      closeModals();
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

export default DelWater_pump;
