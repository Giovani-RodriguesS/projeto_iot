'use client'
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function DoughnutChartDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Presença de Chuva', 'Sem presença de chuva'],
            datasets: [
                {
                    data: [13, 11],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500') || '#42A5F5', 
                        documentStyle.getPropertyValue('--yellow-500') || '#FFEB3B', 
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400') || '#64B5F6', 
                        documentStyle.getPropertyValue('--yellow-400') || '#FFEE58', 
                    ]
                }
            ]
        };
        const options = {
            cutout: '70%'
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card flex justify-content-center">
            <Chart type="doughnut" data={chartData} options={chartOptions} style={{ width: '500px', height: '500px' }} />
        </div>
    )
}
