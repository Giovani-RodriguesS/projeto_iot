'use client';
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import axios from "axios";
import AddDevice from "./addDevice";

export default function Users() {
  const [devices, setDevices] = useState([]);

  // Busca os dispositivos na API
  const fetchDevices = async () => {
    try {
      const response = await axios.get('http://localhost:5257/api/device');
      setDevices(response.data);
    } catch (error) {
      console.error('Erro ao buscar dispositivos:', error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleEdit = (id) => {
    console.log(`Editar dispositivo com ID: ${id}`);
    // Adicione lógica de edição aqui
  };

  const handleDelete = (id) => {
    console.log(`Remover dispositivo com ID: ${id}`);
    // Adicione lógica de exclusão aqui
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-slate-800 h-full">
        <Header title="Dispositivos" username="Letícia Anhaia" />
        <Navbar />
        <main className="w-full max-w-7xl mx-auto px-5 py-7">
          <AddDevice />
          <div className="flex flex-wrap justify-center gap-5 mt-2">
            {devices.map((device) => (
              <div key={device.id} className="p-4 bg-white rounded-xl w-64 flex flex-col items-center">
                <Image
                  src="/images/profiles/device.jpg"
                  width={80}
                  height={80}
                  className="mb-3 rounded-full"
                  alt={device.tipo}
                />
                <div className="text-lg font-bold text-black">{device.nome}</div>
                {device.tipo === "Sensor" ? (
                  <>
                    <div className="text-sm text-black">Umidade: {device.umidade}</div>
                    <div className="text-sm text-black">Data Instalação: {device.data_instalacao}</div>
                  </>
                ) : device.tipo === "Bomba" ? (
                  <>
                    <div className="text-sm text-black">Vazão: {device.vazao}</div>
                    <div className="text-sm text-black">Data Instalação: {device.data_instalacao}</div>
                  </>
                ) : (
                  <div className="text-sm text-gray-500">Tipo desconhecido</div>
                )}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(device.id)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(device.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
