import React from "react";
import LineChart from "@/app/dashboard/LineChart";
import PieChart from "@/app/dashboard/PieChart";
import Header from "@/components/Header";


export default function Reports() {
  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <div className="flex-1 bg-white dark:bg-slate-800 text-black dark:text-white w-full">
        <Header title="Irrigação Smart" username="Usuário" />
        <main>
          <div className="flex flex-wrap gap-4 justify-center mt-7 px-5">
            <div className="p-4 bg-red-500 rounded-lg w-60 flex flex-col items-center justify-center">
              <div>
                <i className="pi pi-clock text-2xl px-2"></i>
                <span className="text-2xl">13</span>
              </div>
              <div className="text-lg pt-2">Detecção de choveu</div>
            </div>
            <div className="p-4 bg-orange-500 rounded-lg w-60 flex flex-col items-center justify-center">
              <div>
                <i className="pi pi-cog text-2xl px-2"></i>
                <span className="text-2xl">10min</span>
              </div>
              <div className="text-lg pt-2">Tempo Bomba Ligada</div>
            </div>
            <div className="p-4 bg-green-500 rounded-lg w-60 flex flex-col items-center justify-center">
              <div>
                <i className="pi pi-exclamation-triangle text-2xl px-2"></i>
                <span className="text-2xl">1000ml</span>
              </div>
              <div className="text-lg pt-2">Água Economizada</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full px-4">
            <div className="bg-gray-200 dark:bg-white p-2 rounded-lg" style={{ overflow: 'hidden' }}>
              <h2 className="text-black text-xl md:text-2xl text-center">Monitoramento Sensores</h2>
              <div className="mt-6 w-full h-full">
                <LineChart />
              </div>
            </div>


            <div className="bg-gray-200 dark:bg-white p-2 rounded-lg flex flex-col items-center" style={{ height: '400px', overflow: 'hidden' }}>
              <h2 className="text-black text-xl md:text-2xl mb-4">Monitoramento Chuva</h2>
              <div className="flex justify-center items-center">
                <PieChart />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>

  );
}
