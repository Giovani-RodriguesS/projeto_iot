import React from "react";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface WaterPumpProps {
  formData: {
    tipo: string;
    vazao: string;
    localizacao: string;
    data_instalacao: string;
  };
  onFormChange: (key: string, value: string) => void;
}

export default function Water_pump({ formData, onFormChange }: WaterPumpProps) {
  const fields = [
    { key: "nome", placeholder: "Nome", icon: "address-book" },
    { key: "tipo", placeholder: "Tipo", icon: "cog" },
    { key: "vazao", placeholder: "Vazão", icon: "bolt" },
    { key: "localizacao", placeholder: "Localização", icon: "map" },
    { key: "data_instalacao", placeholder: "Data Instalação (01/02/2024)", icon: "calendar" },
  ];

  return (
    <div className="card flex flex-col gap-1 pt-0 bg-gray-100 rounded-lg">
      {fields.map(({ key, placeholder, icon }) => (
        <div key={key} className="flex items-center border border-gray-300 rounded-lg bg-white p-3">
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