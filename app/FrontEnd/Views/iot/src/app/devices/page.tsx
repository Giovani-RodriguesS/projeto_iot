'use client';
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import axios from "axios";
import AddDevice from "./AddDevice";

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
    <div className="flex h-screen">
      <div className="flex-1 bg-slate-800 h-full">
        <Header title="Dispositivos" username="Letícia Anhaia" />
        <Navbar />
        <main>
          <AddDevice/>
        </main>
      </div>
    </div>
  );
}
