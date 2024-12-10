'use client';
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";
import AddDevice from "./addDevice";
import { Card } from "@/components/Card";
import 'primeicons/primeicons.css';
import EditModal from "@/app/devices/EditModal";
import DeleteModal from "@/app/devices/DeleteModal";

type Bomba = {
  id: number;
  nome: string;
  tipo: string;
  vazao: string;
  localizacao: string;
  data_instalacao: string;
};

type Sensor = {
  id: number;
  nome: string;
  tipo: string;
  umidade: string;
  data_instalacao: string;
};

export default function Device() {
  const [devices, setDevices] = useState<any[]>([]);
  const [currentEditBomba, setCurrentEditBomba] = useState<Bomba | null>(null);
  const [currentEditSensor, setCurrentEditSensor] = useState<Sensor | null>(null);
  const [currentDeleteBomba, setCurrentDeleteBomba] = useState<Bomba | null>(null);
  const [currentDeleteSensor, setCurrentDeleteSensor] = useState<Sensor | null>(null);

  const imageMap: Record<string, string> = {
    bomba: '/images/devices/bomba.webp',
    sensor_chuva: '/images/devices/sensor_chuva.png',
    sensor_umidade: '/images/devices/sensor_umidade.jpg',
  };

  const fetchDevices = async () => {
    try {
      const responseBomba = await axios.get('http://localhost/api/bomba');
      const responseSensor = await axios.get('http://localhost/api/sensor');

      setDevices([...responseBomba.data, ...responseSensor.data]);
    } catch (error) {
      console.error('Erro ao buscar dispositivos:', error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleEditBomba = (bomba: Bomba) => {
    setCurrentEditBomba(bomba);
  };

  const handleEditSensor = (sensor: Sensor) => {
    setCurrentEditSensor(sensor);
  };

  const closeModalBomba = () => {
    setCurrentEditBomba(null);
    setCurrentDeleteBomba(null);
  };

  const closeModalSensor = () => {
    setCurrentEditSensor(null);
    setCurrentDeleteSensor(null);
  };

  return (
    <div className="flex h-screen sm:overflow-hidden">
      <div className="flex-1 h-full bg-white dark:bg-slate-800 text-black dark:text-white">
        <Header title="Irrigação Smart" username="Usuário" />
        <Navbar />
        <main>
          <AddDevice />
          <div className="flex flex-wrap justify-center gap-5 mt-2">
            {devices.map((device: any) => (
              <Card
              key={device.id}
              imageSrc={device.imagem || '/images/devices/default.png'}
              altText={device.nome || "Dispositivo"}
              title={device.nome || "Dispositivo"}
              id={device.id || "N/A"}
              type={device.tipo || "Desconhecido"}
              description=""
            />
            ))}
          </div>
        </main>
      </div>
      {currentEditBomba && (
        <EditModal
          bomba={currentEditBomba}
          closeModals={closeModalBomba}
          refreshUsers={fetchDevices}
        />
      )}
      {currentEditSensor && (
        <EditModal
          sensor={currentEditSensor}
          closeModals={closeModalSensor}
          refreshUsers={fetchDevices}
        />
      )}
      {currentDeleteBomba && (
        <DeleteModal
          bomba={currentDeleteBomba}
          closeModals={closeModalBomba}
          refreshUsers={fetchDevices}
        />
      )}
      {currentDeleteSensor && (
        <DeleteModal
          sensor={currentDeleteSensor}
          closeModals={closeModalSensor}
          refreshUsers={fetchDevices}
        />
      )}
    </div>
  );
}
