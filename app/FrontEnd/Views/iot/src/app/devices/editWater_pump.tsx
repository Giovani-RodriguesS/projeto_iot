import axios from "axios";
import React, { useState } from "react";

type Water_pump = {
  id: number;
  nome: string;
  tipo: string;
  vazao: number;
  localizacao?: string;
  data_instalacao: string;
};

interface EditModalProps {
  water_pump: Water_pump;
  closeModals: () => void;
  refreshWater_pump: () => void;
}


const EditWater_pump: React.FC<EditModalProps> = ({ water_pump, closeModals, refreshWater_pump }) => {
  const [editedWater_pump, setEditedWater_pump] = useState<Water_pump>(water_pump);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedWater_pump((prev) => ({
      ...prev,
      [name]: name === "vazao" ? Number(value) : value,
    }));
  };

  const handleConfirmUpdate = async () => {
    try {
      if (!editedWater_pump.nome || !editedWater_pump.tipo || editedWater_pump.vazao <= 0) {
        alert("Preencha todos os campos obrigatórios corretamente.");
        return;
      }

      const response = await axios.put(`http://localhost/api/bomba/${editedWater_pump.id}`, {
        nome: editedWater_pump.nome,
        tipo: editedWater_pump.tipo,
        vazao: editedWater_pump.vazao,
        localizacao: editedWater_pump.localizacao,
        data_instalacao: editedWater_pump.data_instalacao,
      });

      if (response.status === 204) {
        console.log("Bomba modificada.");
        refreshWater_pump();
      }
    } catch (error) {
      console.error("Erro ao atualizar a bomba:", error);
      alert("Erro ao atualizar a bomba. Tente novamente.");
    } finally {
      closeModals();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded-lg w-80 text-black">
        <h2 className="text-lg font-bold mb-4">Editar Informações</h2>
        <h1 className="font-bold mb-1 text-gray-700">Nome</h1>
        <input
          type="text"
          name="nome"
          value={editedWater_pump.nome}
          placeholder="Nome"
          className="mb-2 p-2 border w-full rounded"
          onChange={handleInputChange}
        />
        <h1 className="font-bold mb-1 text-gray-700">Tipo</h1>
        <input
          type="text"
          name="tipo"
          value={editedWater_pump.tipo}
          placeholder="Tipo"
          className="mb-2 p-2 border w-full rounded"
          onChange={handleInputChange}
        />
        <h1 className="font-bold mb-1 text-gray-700">Vazão</h1>
        <input
          type="number"
          name="vazao"
          value={editedWater_pump.vazao}
          placeholder="Vazão"
          className="mb-4 p-2 border w-full rounded"
          onChange={handleInputChange}
        />
        <h1 className="font-bold mb-1 text-gray-700">Localização</h1>
        <input
          type="text"
          name="localizacao"
          value={editedWater_pump.localizacao}
          placeholder="Localização"
          className="mb-4 p-2 border w-full rounded"
          onChange={handleInputChange}
        />
        <h1 className="font-bold mb-1 text-gray-700">Data Instalação</h1>
        <input
          type="text"
          name="data_instalacao"
          value={editedWater_pump.data_instalacao}
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

export default EditWater_pump;
