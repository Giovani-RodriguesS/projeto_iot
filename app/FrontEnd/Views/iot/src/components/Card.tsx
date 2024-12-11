import React from "react";
import Image from "next/image";

type Device = {
  id: number;
  nome: string;
  tipo: string;
  categoria: "Sensor" | "Bomba";
  localizacao?: string;
  data_instalacao: string;
  imagem: string;
};

interface CardProps {
  device: Device;
  onEdit: () => void;
  onDelete: () => void;
  imagem: () => void;
}

export const Card: React.FC<CardProps> = ({ device, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-64 flex flex-col items-center shadow-md">
      <div className="w-full mb-3 flex justify-end items-center">
        <i
          className="pi pi-circle-fill"
          style={{
            fontSize: "20px",
            color:"green", // Cor dinâmica baseada no tipo
          }}
        ></i>
      </div>
      <div className="items-center">
      <Image
              src= {device.imagem}
              width={100}
              height={100}
              alt="user profile"
              className="photo rounded-full w-20 h-20"
          />
      </div>
      <div className="text-lg font-bold text-black">{device.nome}</div>
      <div className="text-sm text-black">ID: {device.id}</div>
      <div className="text-sm text-black font-bold">Tipo: {device.tipo}</div>
      {device.localizacao && (
        <div className="text-sm text-black">Localização: {device.localizacao}</div>
      )}
      <div className="text-sm text-black">
        Data de Instalação: {device.data_instalacao}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-600 transition duration-300"
          onClick={onEdit}
        >
          Editar
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300"
          onClick={onDelete}
        >
          Remover
        </button>
      </div>
    </div>
  );
};
