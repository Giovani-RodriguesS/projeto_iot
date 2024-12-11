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

            const leituras = leiturasResponse.data; // Dados do endpoint api/LeituraSensor

            // Filtrar as leituras do sensor de chuva (id 2)
            const leiturasDeChuva = leituras.filter((item: { idSensor: number; }) => item.idSensor === 2);

            // Contar as ocorrências de "choveu" e "não choveu"
            let choveu = 0;
            let naoChoveu = 0;

            leiturasDeChuva.forEach((leitura: { medida: number }) => {
                if (leitura.medida > 5) { // Ajuste o limite conforme necessário
                    choveu++;
                } else {
                    naoChoveu++;
                }
            });
            
            // Configurar os dados do gráfico
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
            console.log('Erro ao buscar dados:', error);
        }
    };

    useEffect(() => {
        fetchData();

        const options = {
            cutout: '70%',
            responsive: true
        };

        setChartOptions(options);
    }, []);

    return (
        <div className="card flex justify-content-center">
            <Chart type="doughnut" data={chartData} options={chartOptions} />
        </div>
    );
}