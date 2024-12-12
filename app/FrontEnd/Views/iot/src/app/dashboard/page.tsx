import React from "react";
import LineChart from "@/app/dashboard/LineChart";
import PieChart from "@/app/dashboard/PieChart";
import Header from "@/components/Header";
import axios from "axios";
import { FaToggleOff } from "react-icons/fa6";
import { FaCloudRain } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";


export default async function Reports() {

  const sensorResponse = await axios.get('http://localhost:80/api/LeituraSensor');
  const bombaResponse = await axios.get('http://localhost:80/api/LeituraBomba');

  const sensorData = sensorResponse.data

  const leiturasDeChuva = sensorData.filter((item: { idSensor: number; }) => item.idSensor === 2);
  const leiturasUmidade = sensorData.filter((item: { idSensor: number; }) => item.idSensor === 1);

  const ultimaMedidaUmidade = leiturasUmidade[leiturasUmidade.length - 1]?.medida;
  const ultimaMedidaChuva = leiturasDeChuva[leiturasDeChuva.length - 1]?.medida;

  const bombaData = bombaResponse.data

  const ultimoEstadoBomba = bombaData[bombaData.length - 1]?.BombaAtivada

  const getBombaStatus = () => {
    if (ultimoEstadoBomba === 0) {
      return "Ativada";
    } else {
      return "Desativada";
    }
  };

  const bombaStatus = getBombaStatus();

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <div className="flex-1 bg-white dark:bg-slate-800 text-black dark:text-white w-full">
        <Header title="Irrigação Smart" username="Usuário" />
        <main>
          <div className="flex flex-wrap gap-8 justify-center mt-7 px-5">

            {/* Card Umidade */}
            <div className="p-4 bg-blue-200 rounded-lg w-80 flex flex-col items-center justify-center text-black dark:text-black">
              <div className="flex items-center">
                <i className="text-3xl mr-2"><FaDroplet /></i>
                <span className="text-2xl">{ultimaMedidaUmidade}</span>
              </div>
              <div className="text-lg pt-2">Umidade Atual</div>
            </div>

            {/* Card Bomba */}
            <div className="p-4 bg-red-500 rounded-lg w-80 flex flex-col items-center justify-center text-black dark:text-black">
              <div className="flex items-center">
                <i className="text-4xl mr-2"><FaToggleOff /></i>
                <span className="text-2xl">{bombaStatus}</span>
              </div>
              <div className="text-lg pt-2">Estado da Bomba</div>
            </div>

            {/* Card Umidade Chuva */}
            <div className="p-4 bg-blue-400 rounded-lg w-80 flex flex-col items-center justify-center text-black dark:text-black">
              <div className="flex items-center">
                <i className="text-4xl mr-2"><FaCloudRain /></i>
                <span className="text-2xl">{ultimaMedidaChuva}</span>
              </div>
              <div className="text-lg pt-2">Umidade de Chuva Atual</div>
            </div>

          </div>


          {/* Gráficos*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-9 w-full px-4">
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
