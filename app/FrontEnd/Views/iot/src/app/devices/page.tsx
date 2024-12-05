'use client';
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";
import AddDevice from "./addDevice";
import { Card } from "@/components/Card";

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

  return (
    <div className="flex h-screen sm:overflow-hidden">
      <div className="flex-1 h-full bg-white dark:bg-slate-800 text-black dark:text-white">
        <Header title="Irrigação Smart" username="Usuário" />
        <Navbar />
        <main>
          <AddDevice/>

          {/* div do meu funcionário Luciano */}
          <div className="flex flex-wrap justify-center gap-5 mt-2">
            <Card
              imageSrc="/images/devices/sensor_umidade.jpg"
              altText="Luciano"
              title="Sensor"
              id="001233"
              type="Umidade"
              description="Planta cadastrada" 
            />
            <Card
              imageSrc="/images/devices/sensor_chuva.png"
              altText="Luciano"
              title="Sensor"
              id="001233"
              type="Chuva"
              description="Planta cadastrada" 
            />
            <Card 
              imageSrc="/images/devices/sensor_umidade.jpg"
              altText="Luciano"
              title="Sensor"
              id="001233"
              type="Umidade"
              description="Planta cadastrada"
            />
            <Card 
              imageSrc="/images/devices/sensor_umidade.jpg"
              altText="Luciano"
              title="Sensor"
              id="001233"
              type="Umidade"
              description="Planta cadastrada"
            />
            <Card 
              imageSrc="/images/devices/sensor_umidade.jpg"
              altText="Luciano"
              title="Sensor"
              id="001233"
              type="Umidade"
              description="Planta cadastrada"
            />
            <Card 
              imageSrc="/images/devices/sensor_umidade.jpg"
              altText="Luciano"
              title="Sensor"
              id="001233"
              type="Umidade"
              description="Planta cadastrada"
            />
          </div>
        </main>
      </div>
    </div>
  );
}