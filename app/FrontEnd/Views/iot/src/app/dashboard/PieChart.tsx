'use client'
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';

export default function DoughnutChartDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const fetchData = async () => {
        try {
            const leiturasResponse = await axios.get('http://localhost/api/LeituraSensor');

            const leituras = leiturasResponse.data;

            const leiturasDeChuva = leituras.filter((item: { idSensor: number }) => item.idSensor === 2);

            let choveu = 0;
            let naoChoveu = 0;

            leiturasDeChuva.forEach((leitura: { medida: number }) => {
                if (leitura.medida > 5) {
                    choveu++;
                } else {
                    naoChoveu++;
                }
            });

            const documentStyle = getComputedStyle(document.documentElement);
            const data = {
                labels: ['Choveu', 'Não choveu'],
                datasets: [
                    {
                        data: [choveu, naoChoveu],
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

            setChartData(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    useEffect(() => {
        fetchData();

        const options = {
            cutout: '70%',
            responsive: true,
        };

        setChartOptions(options);

        const interval = setInterval(() => {
            fetchData();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="card flex flex-column align-items-center text-black">
            <Chart type="doughnut" data={chartData} options={chartOptions} />
            <div className="mt-4 text-center">
                <h4>Legenda</h4>
                <div className="legend-container">
                    {chartData.labels?.map((label, index) => (
                        <div key={index} className="legend-item flex align-items-center mb-2">
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: '16px',
                                    height: '16px',
                                    backgroundColor: chartData.datasets?.[0]?.backgroundColor[index],
                                    marginRight: '8px',
                                    borderRadius: '50%',
                                }}
                            ></span>
                            <span>{label}: {chartData.datasets?.[0]?.data[index]}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}