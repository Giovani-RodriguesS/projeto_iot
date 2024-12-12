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

  const SLIDING_WINDOW_SIZE = 30;

  const fetchChartData = async () => {
    try {
      const sensorResponse = await axios.get('http://localhost:80/api/LeituraSensor');
      const pumpResponse = await axios.get('http://localhost:80/api/LeituraBomba');

      const sensorData: DataSensors[] = sensorResponse.data;
      const pumpData: DataBomba[] = pumpResponse.data;

      // Filtrar dados por sensor
      const sensor1Data = sensorData.filter((item) => item.idSensor === 1);
      const sensor2Data = sensorData.filter((item) => item.idSensor === 2);

      // Preparar os dados para a janela deslizante
      const labels = sensor1Data.slice(-SLIDING_WINDOW_SIZE).map((item) => item.hora);
      const humidityMeasurements = sensor1Data
        .slice(-SLIDING_WINDOW_SIZE)
        .map((item) => item.medida);
      const rainMeasurements = sensor2Data
        .slice(-SLIDING_WINDOW_SIZE)
        .map((item) => item.medida);

      // Estado da bomba dentro da janela deslizante
      const pumpStates = labels.map((hora) => {
        const pumpReading = pumpData.find((item) => item.hora === hora);
        return pumpReading ? pumpReading.bombaAtivada : 0;
      });

      const data = {
        labels,
        datasets: [
          {
            label: '% Umidade',
            data: humidityMeasurements,
            fill: false,
            borderColor: 'aqua',
            tension: 0.4,
            yAxisID: 'left-y-axis',
          },
          {
            label: '% Chuva',
            data: rainMeasurements,
            fill: false,
            borderColor: 'blue',
            tension: 0.4,
            yAxisID: 'left-y-axis',
          },
          {
            label: 'Bomba',
            data: pumpStates,
            fill: false,
            borderColor: 'pink',
            borderDash: [5, 5],
            tension: 0.1,
            yAxisID: 'right-y-axis',
          },
        ],
      };

      setChartData(data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  useEffect(() => {
    const setupChartOptions = () => {
      const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#000',
              font: {
                size: 14,
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#333',
              font: {
                size: 12,
              },
            },
            grid: {
              display: false, 
            },
          },
          'left-y-axis': {
            type: 'linear',
            position: 'left',
            ticks: {
              color: '#333',
              font: {
                size: 12,
              },
              stepSize: 10,
            },
            title: {
              display: true,
              text: '% Sensores',
              color: '#000',
              font: {
                size: 16,
              },
            },
            grid: {
              display: false, // Remove o grid no eixo Y esquerdo
            },
          },
          'right-y-axis': {
            type: 'linear',
            position: 'right',
            ticks: {
              color: '#333',
              font: {
                size: 12,
              },
              stepSize: 1,
            },
            title: {
              display: true,
              text: 'Estado Bomba',
              color: '#000',
              font: {
                size: 16,
              },
            },
            grid: {
              display: false, // Remove o grid no eixo Y direito
            },
          },
        },
      };

      setChartOptions(options);
    };

    setupChartOptions();
    fetchChartData();

    // Configurar auto-atualização a cada 30 segundos
    const intervalId = setInterval(fetchChartData, 30000); // 30000ms = 30 segundos

    // Limpar o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
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
