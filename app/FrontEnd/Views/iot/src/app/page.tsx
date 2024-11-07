import Header from "@/components/Header";
import React from "react";
import LineChart from "@/components/dashboard/LineChart";
import DashDataFrame from "@/components/dashboard/DataTable";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div className="flex">
      <div className="flex-1 bg-black">
        <Header title= "Irrigação Smart" username="Usuário"/>
        <Navbar />
        <main>
          <div className="flex gap-7 justify-center mt-7 ml-5 mr-5">
            <div className="p-4 bg-red-500 rounded-lg w-60 flex flex-col items-center justify-center">
              <div>
                <i className="pi pi-clock text-3xl px-2"></i>
                <span className="text-3xl"> 30s</span>
              </div>
              <div className="text-xl pt-2">Tempo de ciclo Médio</div>
            </div>

            <div className="p-4 bg-orange-500 rounded-lg w-60 flex flex-col items-center justify-center">
              <div>
                <i className="pi pi-cog text-3xl px-2"></i>
                <span className="text-3xl">245</span>
              </div>
              <div className="text-xl pt-2">Peças Produzidas</div>
            </div>

            <div className="p-4 bg-green-500 rounded-lg w-60 flex flex-col items-center justify-center">
              <div>
                <i className="pi pi-exclamation-triangle text-3xl px-2"></i>
                <span className="text-3xl">7,45% </span>
              </div>
              <div className="text-xl pt-2">Defeitos</div>
            </div>

            <div className="p-4 bg-yellow-300 rounded-lg w-60 flex flex-col items-center justify-center">
              <div>
                <i className="pi pi-lightbulb text-3xl px-2"></i>
                <span className="text-3xl"> 350KWh</span>
              </div>
              <div className="text-xl pt-2">Consumo de Energia</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 flex-1 h-4 mt-8">
            <div className="bg-white p-12 rounded-lg ml-4">
              <h2 className="text-white text-xl mb-4">Produção vs. Defeitos</h2>
            
              <LineChart /> 
            
            </div>
            <div className="bg-white p-5 rounded-lg mr-4">
              <h2 className="text-white text-xl mb-4">Outro Gráfico</h2>
          
              <DashDataFrame />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}