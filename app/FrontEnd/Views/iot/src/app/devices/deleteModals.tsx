import { FC } from "react";

type DeleteModalProps = {
  device: { id: number; categoria: "Sensor" | "Bomba" };
  closeModals: () => void;
  onDeviceDelete: (id: number, categoria: "Sensor" | "Bomba") => void;
};

const DeleteModal: FC<DeleteModalProps> = ({ device, closeModals, onDeviceDelete }) => {
  const handleConfirmDelete = () => {
    onDeviceDelete(device.id, device.categoria);
    closeModals();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-lg font-bold mb-4 text-black">
          Tem certeza que deseja excluir este dispositivo?
        </h2>
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
