'use client';
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";
import AddDevice from "./addDevice";
import { Card } from "@/components/Card";
import 'primeicons/primeicons.css';

export default function Users() {
  const [devices, setDevices] = useState<any[]>([]);

  const imageMap: Record<string, string> = {
    bomba: '/images/devices/bomba.webp',
    sensor_chuva: '/images/devices/sensor_chuva.png',
    sensor_umidade: '/images/devices/sensor_umidade.jpg',
    // ... outros casos
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

  return (
    <div className="flex h-screen sm:overflow-hidden">
      <div className="flex-1 h-full bg-white dark:bg-slate-800 text-black dark:text-white">
        <Header title="Irrigação Smart" username="Usuário" />
        <Navbar />
        <main>
          <AddDevice />

          {/* Renderiza os dispositivos */}
          <div className="flex flex-wrap justify-center gap-5 mt-2">
            {devices.map((device: any) => (
              <Card
                key={device.id}
                imageSrc={imageMap[device.nome] || '/images/devices/default.jpg'}
                altText={device.nome || "Dispositivo"}
                title={device.nome || "Dispositivo"}
                id={device.id || "N/A"}
                type={device.tipo || "Desconhecido"}
                description={device.vazao || device.data_instalacao}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
