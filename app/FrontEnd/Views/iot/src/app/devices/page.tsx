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

  return (
    <div className="flex h-screen">
      <div className="flex-1 h-full bg-white dark:bg-slate-800 text-black dark:text-white">
        <Header title="Usuários" username="Letícia Anhaia" />
        <Navbar />
        <main>
          <AddDevice/>
          <div className="flex flex-wrap justify-center gap-5 mt-2">

            {/* div do meu funcionário Luciano */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/devices/sensor_umidade.jpg" width={70} height={70} className="mb-3 rounded-full" alt="Luciano" />
              <div className="text-lg font-bold text-black">Sensor</div>
              <div className="text-sm text-black">ID: 001233</div>
              <div className="text-sm text-black font-bold">Tipo: Umidade</div>
              <div className="text-sm text-black">Planta cadastrada</div>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>
            </div>

            {/* div do meu funcionário Roberto */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/devices/sensor_chuva.png" width={70} height={70} className="mb-3 rounded-full" alt="Roberto" />
              <div className="text-lg font-bold text-black">Sensor</div>
              <div className="text-sm text-black">ID: 001345</div>
              <div className="text-sm text-black font-bold">Tipo: Chuva</div>
              <div className="text-sm text-black">Planta cadastrada</div>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>
            </div>

            {/* div da minha funcionária Bruna */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/devices/sensor_umidade.jpg" width={70} height={70} className="mb-3 rounded-full" alt="Bruna" />
              <div className="text-lg font-bold text-black">Sensor</div>
              <div className="text-sm text-black">ID: 003212</div>
              <div className="text-sm text-black font-bold">Tipo: Umidade</div>
              <div className="text-sm text-black">Planta cadastrada</div>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>
            </div>


            {/* div da minha funcionária Giseli */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/devices/sensor_chuva.png" width={70} height={70} className="mb-3 rounded-full" alt="Giseli" />
              <div className="text-lg font-bold text-black">Sensor</div>
              <div className="text-sm text-black">ID: 009245</div>
              <div className="text-sm text-black font-bold">Tipo: Chuva</div>
              <div className="text-sm text-black">Planta cadastrada</div>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>
            </div>

            {/* div da minha funcionária Luana */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/devices/sensor_chuva.png" width={70} height={70} className="mb-3 rounded-full" alt="Luana" />
              <div className="text-lg font-bold text-black">Sensor</div>
              <div className="text-sm text-black">ID: 000298</div>
              <div className="text-sm text-black font-bold">Tipo: Chuva</div>
              <div className="text-sm text-black">Planta cadastrada</div>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>
            </div>

            {/* div do meu funcionário Lucas */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/devices/Bomba.webp" width={70} height={70} className="mb-3 rounded-full" alt="Lucas" />
              <div className="text-lg font-bold text-black">Bomba</div>
              <div className="text-sm text-black">ID: 011298</div>
              <div className="text-sm text-black font-bold">Tipo: Escova</div>
              <div className="text-sm text-black">Planta cadastrada</div>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>
            </div>

            {/* div da minha funcionária Letícia */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/devices/Bomba.webp" width={70} height={70} className="mb-3 rounded-full" alt="Letícia" />
              <div className="text-lg font-bold text-black">Bomba</div>
              <div className="text-sm text-black">ID: 011223</div>
              <div className="text-sm text-black font-bold">Tipo: Escova</div>
              <div className="text-sm text-black">Planta cadastrada</div>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>
            </div>

            {/* div do meu funcionário Gabriel */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/devices/Bomba.webp" width={70} height={70} className="mb-3 rounded-full" alt="Gabriel" />
              <div className="text-lg font-bold text-black">Bomba</div>
              <div className="text-sm text-black">ID: 011234</div>
              <div className="text-sm text-black font-bold">Tipo: Escova</div>
              <div className="text-sm text-black">Planta cadastrada</div>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>
            </div>

            {/* div do meu funcionário Rafael */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/devices/Bomba.webp" width={70} height={70} className="mb-3 rounded-full" alt="Rafael" />
              <div className="text-lg font-bold text-black">Bomba</div>
              <div className="text-sm text-black">ID: 098843</div>
              <div className="text-sm text-black font-bold">Tipo: Escova</div>
              <div className="text-sm text-black">Planta cadastrada</div>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>
            </div>

            {/* div da minha funcionária Aline */}
            <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
              <Image src="/images/devices/Bomba.webp" width={70} height={70} className="mb-3 rounded-full" alt="Aline" />
              <div className="text-lg font-bold text-black">Bomba</div>
              <div className="text-sm text-black">ID: 014598</div>
              <div className="text-sm text-black font-bold">Tipo: Escova</div>
              <div className="text-sm text-black">Planta cadastrada</div>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
                  Editar
                </button>
                <button className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
                  Remover
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
