'use client'

import Card from "./Card";

export default function Cards() {
    return (
        <div className="div-cards">
            <Card title="Tempo de Ciclo" content="12" measures="s" bg_color="bg-blue-300"/>
            <Card title="Consumo Energético" content="120" measures="kWh" bg_color="bg-yellow-200"/>
            <Card title="Peças Produzidas" content="200" bg_color="bg-green-300"/>
            <Card title="Taxa de Defeito" content="2" measures="%" bg_color="bg-red-300"/>
        </div>
    
    );

}