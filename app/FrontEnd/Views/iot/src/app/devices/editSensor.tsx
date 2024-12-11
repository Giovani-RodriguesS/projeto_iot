import axios from "axios";
import React, { useState } from "react";

type Sensor = {
  id: number;
  nome: string;
  umidade: number;
  tipo: string;
  data_instalacao: string;
};

interface EditModalProps {
  sensor: Sensor;
  closeModals: () => void;
  refreshSensor: () => void;
}

const EditSensor: React.FC<EditModalProps> = ({ sensor, closeModals, refreshSensor }) => {
  const [editedSensor, setEditedSensor] = useState<Sensor>(sensor);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedSensor((prev) => ({
      ...prev,
      [name]: name === "umidade" ? Number(value) : value, // Convertendo `umidade` para número
    }));
  };

  const handleConfirmUpdate = async () => {
    try {

      const response = await axios.put(`http://localhost/api/sensor/${editedSensor.id}`, {
        nome: editedSensor.nome,
        tipo: editedSensor.tipo,
        umidade: editedSensor.umidade,
        data_instalacao: editedSensor.data_instalacao,
      });
  
      if (response.status === 204) {
        console.log("Sensor atualizado com sucesso.");
        refreshSensor();
      } else {
        console.error("Erro: Status inesperado", response.status);
      }
    } catch (error) {
      console.error("Erro ao atualizar o sensor:", error);
      alert("Erro ao atualizar o sensor. Tente novamente.");
    } finally {
      closeModals();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg w-80 text-black">
        <h2 className="text-lg font-bold mb-4 justify-center">Editar Informações</h2>
        <h1 className="font-bold mb-1 text-gray-700">Nome</h1>
        <input
          type="text"
          name="nome"
          value={editedSensor.nome}
          placeholder="Nome"
          className="mb-2 p-2 border w-full rounded"
          onChange={handleInputChange}
        />
        <h1 className="font-bold mb-1 text-gray-700">Tipo</h1>
        <input
          type="text"
          name="tipo"
          value={editedSensor.tipo}
          placeholder="Tipo"
          className="mb-2 p-2 border w-full rounded"
          onChange={handleInputChange}
        />
        <h1 className="font-bold mb-1 text-gray-700">Umidade</h1>
        <input
          type="number"
          name="umidade"
          value={editedSensor.umidade}
          placeholder="Umidade"
          className="mb-4 p-2 border w-full rounded"
          onChange={handleInputChange}
        />
        <h1 className="font-bold mb-1 text-gray-700">Data Instalação</h1>
        <input
          type="text"
          name="data_instalacao"
          value={editedSensor.data_instalacao}
          placeholder="Data de Instalação"
          className="mb-4 p-2 border w-full rounded"
          onChange={handleInputChange}
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

export default EditSensor;
