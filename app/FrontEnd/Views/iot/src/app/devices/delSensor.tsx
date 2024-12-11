import { FC } from "react";
import axios from "axios";

type SensorDevice = {
  id: number;
};

interface DeleteModalProps {
  sensor: SensorDevice;
  closeModals: () => void;
  refreshSensor: () => void;
}

const DelSensor: FC<DeleteModalProps> = ({closeModals, refreshSensor, sensor}) => {
  const handleConfirmDelete = async () => {
    try {
      const responseDelSensor = await axios.delete(`http://localhost/api/sensor/${sensor.id}`);
      if (responseDelSensor.status === 204) {
        console.log("Sensor deletado com sucesso.");
        refreshSensor();
      }
    } catch (error: any) {
      console.error(
        "Erro ao deletar sensor:",
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

export default DelSensor;
