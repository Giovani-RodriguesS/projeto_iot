'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddDevice from "./addDevice";
import { Card } from "@/components/Card";
import EditSensor from "@/app/devices/editSensor";
import EditWaterPump from "@/app/devices/editWater_pump";
import DelSensor from "@/app/devices/delSensor";
import DelWater_pump from "@/app/devices/delWater_pump";

type Device = {
  id: number;
  nome: string;
  tipo: string;
  categoria: "Sensor" | "Bomba";
  localizacao?: string;
  data_instalacao: string;
};


export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [currentEditDevice, setCurrentEditDevice] = useState<Device | null>(null);
  const [currentDeleteDevice, setCurrentDeleteDevice] = useState<Device | null>(null);

  const fetchDevices = async () => {
    try {
      const [responseBomba, responseSensor] = await Promise.all([
        axios.get<Device[]>("http://localhost/api/bomba"),
        axios.get<Device[]>("http://localhost/api/sensor"),
      ]);
  
      const bombas = responseBomba.data.map((device) => ({
        ...device,
        categoria: "Bomba", // Adicione a categoria para diferenciar
      }));
      const sensores = responseSensor.data.map((device) => ({
        ...device,
        categoria: "Sensor", // Adicione a categoria para diferenciar
      }));
  
      setDevices([...bombas, ...sensores]);
    } catch (error: any) {
      console.error(
        "Erro ao buscar dispositivos:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleEdit = (device: Device) => {
    setCurrentEditDevice(device);
  };

  const handleDelete = (device: Device) => {
    setCurrentDeleteDevice(device);
  };

  const closeModals = () => {
    setCurrentEditDevice(null);
    setCurrentDeleteDevice(null);
  };

  return (
    <div className="flex h-screen sm:overflow-hidden">
      <div className="flex-1 h-full bg-white dark:bg-slate-800 text-black dark:text-white">
        <Header title="Irrigação Smart" username="Usuário" />
  
        <main>
          <AddDevice />
          <div className="flex flex-wrap justify-center gap-5 mt-2">
            {devices.map((device) => (
              <Card
                key={device.id}
                device={device}
                onEdit={() => handleEdit(device)}
                onDelete={() => handleDelete(device)}
              />
            ))}
          </div>
        </main>
      </div>

      {/* Modal de edição */}
      {currentEditDevice && (
        currentEditDevice.categoria === "Sensor" ? (
          <EditSensor
            sensor={currentEditDevice}
            closeModals={closeModals}
            refreshSensor={fetchDevices}
          />
        ) : (
          <EditWaterPump
            water_pump={currentEditDevice}
            closeModals={closeModals}
            refreshWater_pump={fetchDevices}
          />
        )
      )}

      {/* Modal de exclusão */}
      {currentDeleteDevice && (
      currentDeleteDevice.categoria === "Sensor" ? (
        <DelSensor
          sensor={currentDeleteDevice}
          closeModals={closeModals}
          refreshSensor={fetchDevices}
        />
      ) : (
        <DelWater_pump
          bomba={currentDeleteDevice}
          closeModals={closeModals}
          refreshWater_pump={fetchDevices}
        />
      )
    )}
    </div>
  );
}