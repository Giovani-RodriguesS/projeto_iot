'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddDevice from "./addDevice";
import { Card } from "@/components/Card";
import EditSensor from "@/app/devices/editSensor";
import EditWaterPump from "@/app/devices/editWater_pump";
import Header from "@/components/Header";
import DeleteModal from "@/app/devices/deleteModals";

// Definição dos tipos
type Sensor = {
  id: number;
  nome: string;
  tipo: string;
  categoria: "Sensor";
  localizacao?: string;
  data_instalacao: string;
  umidade: number;
};

type Bomba = {
  id: number;
  nome: string;
  tipo: string;
  categoria: "Bomba";
  localizacao?: string;
  data_instalacao: string;
  vazao: number;
};

type Water_pump = Bomba;

type Device = Sensor | Bomba;

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [currentEditDevice, setCurrentEditDevice] = useState<Device | null>(null);
  const [currentDeleteDevice, setCurrentDeleteDevice] = useState<Device | null>(null);

  const fetchDevices = async () => {
    try {
      const [responseBomba, responseSensor] = await Promise.all([
        axios.get<Bomba[]>("http://localhost/api/bomba"),
        axios.get<Sensor[]>("http://localhost/api/sensor"),
      ]);

      const bombas: Bomba[] = responseBomba.data.map((device) => ({
        ...device,
        categoria: "Bomba",
      }));
      
      const sensores: Sensor[] = responseSensor.data.map((device) => ({
        ...device,
        categoria: "Sensor",
      }));

      setDevices([...bombas, ...sensores] as Device[]);
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

  const handleDelete = async (id: number, categoria: "Sensor" | "Bomba") => {
    try {
      const endpoint = categoria === "Sensor"
        ? `http://localhost/api/sensor/${id}`
        : `http://localhost/api/bomba/${id}`;

      const response = await axios.delete(endpoint);

      if (response.status === 204) {
        await fetchDevices();
        console.log("Dispositivo deletado com sucesso.");
      }
    } catch (error: any) {
      console.error(
        "Erro ao deletar dispositivo:",
        error.response?.data?.message || error.message
      );
    }
  };

  const closeModals = () => {
    setCurrentEditDevice(null);
    setCurrentDeleteDevice(null);
  };

  const isWaterPump = (device: Device): device is Water_pump => {
    return device.categoria === "Bomba" && "vazao" in device;
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
                onDelete={() => setCurrentDeleteDevice(device)}
              />
            ))}
          </div>
        </main>
      </div>

      {currentEditDevice && (
        currentEditDevice.categoria === "Sensor" ? (
          <EditSensor
            sensor={currentEditDevice as Sensor}
            closeModals={closeModals}
            refreshSensor={fetchDevices}
          />
        ) : (
          isWaterPump(currentEditDevice) && (
            <EditWaterPump
              water_pump={currentEditDevice as Water_pump}
              closeModals={closeModals}
              refreshWater_pump={fetchDevices}
            />
          )
        )
      )}

      {/* Modal de exclusão */}
      {currentDeleteDevice && (
        <DeleteModal
          device={currentDeleteDevice}
          closeModals={closeModals}
          onDeviceDelete={handleDelete}
        />
      )}
    </div>
  );
}
