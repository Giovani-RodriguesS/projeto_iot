'use client'
import Header from "@/components/Header";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import AddDevice from "./addDevice";

export default function Users() {
  return (
    <div className="flex h-screen  bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="flex-1 bg-slate-800 h-full">
        <Header title="Usuários" username="Letícia Anhaia" />
        <Navbar />
        <main className="w-full max-w-7xl mx-auto px-5 py-7">
          <AddDevice/>
          <div className="flex flex-wrap justify-center gap-5 mt-2">

            {/* div do meu funcionário Luciano */}
            <div className="p-4 bg-white rounded-xl w-48 flex flex-col items-center">
              <Image src="/images/devices/sensor_umidade.jpg" width={80} height={80} className="mb-3 rounded-full" alt="Luciano" />
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
            <div className="p-4 bg-white rounded-xl w-48 flex flex-col items-center">
              <Image src="/images/devices/sensor_chuva.png" width={80} height={80} className="mb-3 rounded-full" alt="Roberto" />
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
            <div className="p-4 bg-white rounded-xl w-48 flex flex-col items-center">
              <Image src="/images/devices/sensor_umidade.jpg" width={80} height={80} className="mb-3 rounded-full" alt="Bruna" />
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
            <div className="p-4 bg-white rounded-xl w-48 flex flex-col items-center">
              <Image src="/images/devices/sensor_chuva.png" width={80} height={80} className="mb-3 rounded-full" alt="Giseli" />
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
            <div className="p-4 bg-white rounded-xl w-48 flex flex-col items-center">
              <Image src="/images/devices/sensor_chuva.png" width={80} height={80} className="mb-3 rounded-full" alt="Luana" />
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
            <div className="p-4 bg-white rounded-xl w-48 flex flex-col items-center">
              <Image src="/images/devices/Bomba.webp" width={80} height={80} className="mb-3 rounded-full" alt="Lucas" />
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
            <div className="p-4 bg-white rounded-xl w-48 flex flex-col items-center">
              <Image src="/images/devices/Bomba.webp" width={80} height={80} className="mb-3 rounded-full" alt="Letícia" />
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
            <div className="p-4 bg-white rounded-xl w-48 flex flex-col items-center">
              <Image src="/images/devices/Bomba.webp" width={80} height={80} className="mb-3 rounded-full" alt="Gabriel" />
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
            <div className="p-4 bg-white rounded-xl w-48 flex flex-col items-center">
              <Image src="/images/devices/Bomba.webp" width={80} height={80} className="mb-3 rounded-full" alt="Rafael" />
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
            <div className="p-4 bg-white rounded-xl w-48 flex flex-col items-center">
              <Image src="/images/devices/Bomba.webp" width={80} height={80} className="mb-3 rounded-full" alt="Aline" />
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