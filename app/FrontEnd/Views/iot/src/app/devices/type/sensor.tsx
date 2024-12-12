import React from "react";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface SensorProps {
  formData: {
    nome: string;
    tipo: string;
    umidade: string;
    data_instalacao: string;
  };
  onFormChange: (key: string, value: string) => void;
}

export default function Sensor({ formData, onFormChange }: SensorProps) {
  const fields = [
    { key: "nome", placeholder: "Nome", icon: "box" },
    { key: "tipo", placeholder: "Tipo", icon: "cog" },
    { key: "umidade", placeholder: "Umidade", icon: "slack" },
    {
      key: "data_instalacao",
      placeholder: "Data Instalação (01/02/2024)",
      icon: "calendar",
    },
  ];

  const tipos = ["Umidade", "Chuva"]; // Opções de tipos de sensor

  // Função para alternar ciclicamente entre os tipos
  const toggleTipo = () => {
    const currentIndex = tipos.indexOf(formData.tipo);
    const nextIndex = (currentIndex + 1) % tipos.length; // Alterna ciclicamente
    onFormChange("tipo", tipos[nextIndex]);
  };

  return (
    <div className="card flex flex-col gap-1 pt-0 bg-gray-100 rounded-lg">
      {fields.map(({ key, placeholder, icon }) => (
        <div
          key={key}
          className="flex items-center border border-gray-300 rounded-lg bg-white p-3"
        >
          <div className="text-blue-500 text-2xl mr-4">
            <i className={`pi pi-${icon}`}></i>
          </div>
          {key === "tipo" ? (
            // Renderizando o botão de alternância de tipo
            <div className="flex items-center justify-between w-full">
              <span className="px-2 text-black">{formData.tipo}</span>
              <button
                className="text-s text-blue-500 px-2 hover:text-blue-700 transition-all"
                onClick={toggleTipo}
              >
                Alterar Tipo <i className="pi pi-chevron-right"></i>
              </button>
            </div>
          ) : (
            <InputText
              placeholder={placeholder}
              value={formData[key as keyof typeof formData]}
              onChange={(e) => onFormChange(key, e.target.value)}
              className="w-full p-2 focus:outline-none"
              style={{ color: "black" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}