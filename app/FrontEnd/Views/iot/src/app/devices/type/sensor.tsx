import React from "react";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface SensorProps {
  formData: {
    nome: string;
    data_instalacao: string;
    localizacao: string;
  };
  onFormChange: (key: string, value: string) => void;
}

export default function Sensor({ formData, onFormChange }: SensorProps) {
  const fields = [
    { key: "nome", placeholder: "NOME", icon: "user" },
    { key: "tipo", placeholder: "TIPO", icon: "cog" },
    { key: "umidade", placeholder: "UMIDADE", icon: "slack" },
    { key: "data_instalacao", placeholder: "DATA INSTALAÇÃO", icon: "calendar" },
  ];

  return (
    <div className="card flex flex-col gap-4 p-6 bg-gray-100 rounded-lg">
      {fields.map(({ key, placeholder, icon }) => (
        <div key={key} className="flex items-center border border-gray-300 rounded-lg bg-white p-4">
          <div className="text-blue-500 text-2xl mr-4">
            <i className={`pi pi-${icon}`}></i>
          </div>
          <InputText
            placeholder={placeholder}
            value={formData[key as keyof typeof formData]}
            onChange={(e) => onFormChange(key, e.target.value)}
            className="w-full p-2 focus:outline-none"
            style={{ color: "black" }}
          />
        </div>
      ))}
    </div>
  );
}