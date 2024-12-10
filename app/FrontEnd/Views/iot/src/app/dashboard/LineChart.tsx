'use client';
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';

interface DataSensors {
  data: string;
  hora: string;
  idSensor: number;
  medida: number;
}

interface DataBomba { 
  data: string;
  hora: string;
  idBomba: number;
  bombaAtivada: number;
}

export default function LineChart() {
  const [chartData, setChartData] = useState<any>(null);
  const [chartOptions, setChartOptions] = useState<any>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('http://localhost:80/api/LeituraSensor');
        const responseBomba = await axios.get('http://localhost:80/api/LeituraBomba');

        const dataFromApi: DataSensors[] = response.data;
        const dataBomba: DataBomba[] = responseBomba.data;

        // Filtrar dados por idSensor
        const sensor1Data = dataFromApi.filter((item) => item.idSensor === 1);
        const sensor2Data = dataFromApi.filter((item) => item.idSensor === 2);

        // Preparar os dados para o gráfico
        const labels = sensor1Data.map((item) => item.hora); // Usando horários do sensor 1 como base
        const umidade = sensor1Data.map((item) => item.medida); // Medidas do sensor 1
        const chuva = sensor2Data.map((item) => item.medida); // Medidas do sensor 2

        // Obter estado da bomba para os horários correspondentes
        const bombaEstado = labels.map((hora) => {
          const bomba = dataBomba.find((item) => item.hora === hora);
          return bomba ? bomba.bombaAtivada : 0; // Assume desligado (0) se não houver dado
        });

        // Garantir que os valores sejam numéricos
        const parsedUmidade = umidade.map((value) => Number(value));
        const parsedChuva = chuva.map((value) => Number(value));

        // Configurar os dados do gráfico
        const data = {
          labels,
          datasets: [
            {
              label: '% Umidade',
              data: parsedUmidade,
              fill: false,
              borderColor: 'aqua', // Cor verde-água
              tension: 0.4,
              yAxisID: 'left-y-axis',
            },
            {
              label: '% Chuva',
              data: parsedChuva,
              fill: false,
              borderColor: 'blue', // Cor azul
              tension: 0.4,
              yAxisID: 'right-y-axis',
            },
            {
              label: 'Bomba Ativada',
              data: bombaEstado,
              fill: false,
              borderColor: 'red', // Cor vermelha para destacar
              borderDash: [5, 5], // Linha tracejada para indicar status
              tension: 0.1,
              yAxisID: 'right-y-axis',
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error('Erro ao buscar os dados do endpoint:', error);
      }
    };

    const setupChartOptions = () => {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                size: 14, // Aumenta a legibilidade do eixo X
              },
            },
            grid: {
              color: surfaceBorder,
            },
          },
          'left-y-axis': {
            type: 'linear',
            position: 'left',
            ticks: {
              color: textColorSecondary,
              font: {
                size: 14, // Aumenta a legibilidade do eixo Y esquerdo
              },
              stepSize: 5, // Define intervalos consistentes entre os valores
            },
            grid: {
              color: surfaceBorder,
            },
          },
          'right-y-axis': {
            type: 'linear',
            position: 'right',
            ticks: {
              color: textColorSecondary,
              font: {
                size: 14, // Aumenta a legibilidade do eixo Y direito
              },
              stepSize: 1, // Escala para os valores binários da bomba
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };

      setChartOptions(options);
    };

    setupChartOptions();
    fetchChartData();
  }, []);

  return (
    <div className="card w-full h-full">
      {chartData && chartOptions ? (
        <Chart type="line" data={chartData} options={chartOptions} style={{ height: '300px' }} />
      ) : (
        <p>Carregando dados do gráfico...</p>
      )}
    </div>
  );
}
