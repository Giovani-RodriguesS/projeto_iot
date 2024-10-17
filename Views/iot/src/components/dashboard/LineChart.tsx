'use client';
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export default function LineChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const data = {
            labels: ['Jan', 'Febr', 'Mar', 'Abri', 'Mai', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'Produção',
                    data: [70, 68, 80, 81, 56, 55, 60],
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Defeitos',
                    data: [4, 5, 2, 7, 1, 2, 3],
                    fill: false,
                    tension: 0.4
                }
            ]
        };

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 1,
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={chartOptions} className=""/>
        </div>
    );
}
