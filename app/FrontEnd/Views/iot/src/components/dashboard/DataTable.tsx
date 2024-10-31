'use client'

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

export default function DashDataFrame() {
    const [performance, setPerfomance] = useState<Perfomance[]>([]);

    useEffect(() => {
        const data: Perfomance[] = [
            {id: 1, step: " Produção",  cycletime: "5s", quantity: 10, rating: "5%", energy: "5 Wh"},
            {id: 2, step: " Qualidade", cycletime: "7s", quantity: 12, rating: "5%", energy: "5 Wh"},
            {id: 3, step: " Separação", cycletime: "4s", quantity: 14, rating: "5%", energy: "5 Wh"},
            {id: 4, step: " Produção",  cycletime: "2s", quantity: 16, rating: "5%", energy: "5 Wh"},
            {id: 5, step: " Qualidade", cycletime: "5s", quantity: 18, rating: "5%", energy: "5 Wh"},
            {id: 6, step: " Separação", cycletime: "3s", quantity: 10, rating: "5%", energy: "5 Wh"},
            {id: 7, step: " Produção",  cycletime: "8s", quantity: 11, rating: "5%", energy: "5 Wh"},
            {id: 8, step: " Qualidade", cycletime: "9s", quantity: 15, rating: "5%", energy: "5 Wh"},
            {id: 9, step: " Separação", cycletime: "4s", quantity: 17, rating: "5%", energy: "5 Wh"},
            {id: 10, step: "Produção",  cycletime: "5s", quantity: 19, rating: "5%", energy: "5 Wh"}

        ];

        setPerfomance(data);
    }, []);

    return (
        <div className="card">
            <DataTable value={performance} tableStyle={{ minWidth: '100%' }}>
                <Column field="id" header="ID"></Column>
                <Column field="step" header="Step"></Column>
                <Column field="cycletime" header="Cycle Time"></Column>
                <Column field="quantity" header="Quantity"></Column>
                <Column field="rating" header="Rating"></Column>
                <Column field="energy" header="Energy"></Column>
            </DataTable>
        </div>
    );
}