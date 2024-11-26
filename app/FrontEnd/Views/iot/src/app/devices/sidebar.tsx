import React, { useState } from "react";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import Water_pump from "./type/water_pump";
import Sensor from "./type/sensor";

export default function SidebarDevices() {
  const options: { label: string; value: string }[] = [
    { label: "Bomba", value: "Bomba" },
    { label: "Sensor", value: "Sensor" },
  ];

  const [value, setValue] = useState<string>(options[0].value);

  return (
    <div className="card flex flex-col bg-gray-100 rounded-lg mt-4">
      {/* Botão de seleção */}
      <div className="flex justify-center mb-1">
        <SelectButton
          value={value}
          onChange={(e: SelectButtonChangeEvent) => setValue(e.value)}
          options={options}
          optionLabel="label"
          optionValue="value"
          className="w-full p-button-outlined"
          itemTemplate={(option) => (
            <div
              className={`p-3 rounded-lg cursor-pointer ${
                value === option.value ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {option.label}
            </div>
          )}
        />
      </div>

      {/* Renderizar o componente baseado na seleção */}
      <div className="">
        {value === "Bomba" ? <Water_pump /> : <Sensor />}
      </div>
    </div>
  );
}
