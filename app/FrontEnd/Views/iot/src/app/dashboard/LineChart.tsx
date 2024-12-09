'use client';
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function LineChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const data = {
      labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      datasets: [
        {
          label: '% umidade',
          data: [65, 59, 80, 81, 56, 55, 40, 90, 85, 72, 60, 75, 69, 55, 68, 74, 60, 55, 80, 70, 65, 55, 40, 30],
          fill: true,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
          yAxisID: 'left-y-axis'
        },
        {
          label: 'Sensor Chuva',
          data: [0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.1,
          yAxisID: 'right-y-axis'
        }
      ]
    };

    const options = {
      maintainAspectRatio: false,  // Permite que o gráfico se ajuste ao contêiner
      responsive: true,  // Garante que o gráfico seja responsivo
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        'left-y-axis': {
          type: 'linear',
          position: 'left',
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        'right-y-axis': {
          type: 'linear',
          position: 'right',
          ticks: {
            color: textColorSecondary
          },
          grid: {
            drawOnChartArea: false
          }
        }
      }
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="card w-full h-full">
      <Chart type="line" data={chartData} options={chartOptions} style={{height:'300px'}} />
    </div>
  );
}
