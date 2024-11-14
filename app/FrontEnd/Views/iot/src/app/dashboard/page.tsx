import React from "react";
import LineChart from "@/app/dashboard/LineChart";
import PieChart from "@/app/dashboard/PieChart";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

export default function Reports() {
  return (
    <div className="flex min-h-screen">
    <div className="flex-1 bg-black">
      <Header title= "Irrigação Smart" username="Usuário"/>
      <Navbar />
      <main>
        <div className="flex gap-7 justify-center mt-7 ml-5 mr-5">
          <div className="p-4 bg-red-500 rounded-lg w-60 flex flex-col items-center justify-center">
            <div>
              <i className="pi pi-clock text-3xl px-2"></i>
              <span className="text-3xl"> 13</span>
            </div>
            <div className="text-xl pt-2">Detecção de choveu</div>
          </div>

          <div className="p-4 bg-orange-500 rounded-lg w-60 flex flex-col items-center justify-center">
            <div>
              <i className="pi pi-cog text-3xl px-2"></i>
              <span className="text-3xl">10min</span>
            </div>
            <div className="text-xl pt-2">Tempo Bomba Ligada</div>
          </div>

          <div className="p-4 bg-green-500 rounded-lg w-60 flex flex-col items-center justify-center">
            <div>
              <i className="pi pi-exclamation-triangle text-3xl px-2"></i>
              <span className="text-3xl">1000ml</span>
            </div>
            <div className="text-xl pt-2">Água Economizada</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 flex-1 h-4 mt-8">
          <div className="bg-white p-12 rounded-lg ml-4">
            <h2 className="text-black text-xl mb-4 text-center">Monitoramento Sensores</h2>
            <div className="mt-10">
              <LineChart /> 
            </div>
          </div>
          <div className="bg-white p-12 rounded-lg ml-4 flex flex-col items-center">
            <h2 className="text-black text-x1 mb-4">Monitoramento chuva</h2>
            <div className="flex justify-center items-center w-full mt-8">
              <PieChart />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}
