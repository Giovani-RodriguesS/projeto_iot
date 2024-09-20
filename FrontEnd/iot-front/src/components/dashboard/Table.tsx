import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Perfomance {
    id: number;
    step: string;
    cycletime: string;
    quantity: number;
    rating: string;
    energy: string;
}

export default function Table() {
    const [performance, setPerfomance] = useState<Perfomance[]>([]);

    useEffect(() => {
        const data: Perfomance[] = [
            {id: 1, step: "Produção", cycletime: "5s", quantity: 10, rating: "5%", energy: "1 kWh"},
            {id: 2, step: "Qual", cycletime: "5s", quantity: 10, rating: "5%", energy: "1 kWh"},
            {id: 3, step: "Test", cycletime: "5s", quantity: 10, rating: "5%", energy: "1 kWh"}
        ];

        setPerfomance(data);
    }, []);

    return (
        <div className="bg-slate-800 text-gray-300 rounded-xl p-4 min-w-4">
            <DataTable value={performance}>
                <Column field="id" header="Id"></Column>
                <Column field="step" header="Etapa"></Column>
                <Column field="cycletime" header="Ciclo"></Column>
                <Column field="quantity" header="Quantidade"></Column>
                <Column field="rating" header="Taxa"></Column>
                <Column field="energy" header="Energia"></Column>
            </DataTable>
        </div>
    );
}