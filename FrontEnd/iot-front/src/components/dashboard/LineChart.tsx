'use client'
import React, { useEffect, useState } from "react";
import { Chart } from 'primereact/chart'

export default function LineChart () {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => { 
        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [
                {
                    label: 'Produção - (Hr)',
                    data: [70, 59, 80, 81, 56, 55],
                    fill: false,
                    tension: 0.4,
                    borderColor: 'rgba(75, 192, 192, 1)'
                },
                {
                    label: 'Defeitos (Hr)',
                    data: [2, 3, 4, 9, 8, 2],
                    fill: false,
                    tension: 0.4,
                    borderColor: '#BF372A'
                    
                },
                {
                    label: 'Tempo Ciclo (s)',
                    data: [12, 10, 11, 8, 7, 5],
                    fill: false,
                    tension: 0.4,
                    borderColor: '#0CF25D'
                },
                {
                    label: 'Consumo de Energia - (kWh)',
                    data: [3, 0, 12, 4, 2, 7],
                    fill: false,
                    tension: 0.4,
                    borderColor: '#F2B705'

                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.85,
            responsive: true,
            
            scales: {
                x: {
                    ticks: {
                        color: 'rgba(255, 255, 255, 1)', 
                    }
                },
                y: {
                    ticks: {
                        color: 'rgba(255, 255, 255, 1)',
                    }
                }
            }
        
        };
        

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="mr-4 ml-4 h-full rounded-lg bg-gray-900" >
            <Chart type="line" data={chartData} options={chartOptions}/>
        </div>
        )
}