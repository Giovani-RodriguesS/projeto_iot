import React from "react";
import Image from "next/image";


interface CardProps {
  imageSrc: string;
  altText: string
  title: string;
  id: string;
  type: string;
  description: string;
}

export const Card: React.FC<CardProps> = ({ imageSrc, altText, title, id, type, description }) => {
  return (
    <div className="p-4 bg-gray-200 dark:bg-white rounded-xl w-30 flex flex-col items-center">
      <Image src={imageSrc} width={70} height={70} className="mb-3 rounded-full" alt={altText} />
      <div className="text-lg font-bold text-black">{title}</div>
      <div className="text-sm text-black">ID: {id}</div>
      <div className="text-sm text-black font-bold">Tipo: {type}</div>
      <div className="text-sm text-black">{description}</div>
      <div className="mt-4 flex gap-2">
        <button className="px-3 py-1 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-700 transition duration-300">
          Editar
        </button>
        <button className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-700 transition duration-300">
          Remover
        </button>
      </div>
    </div>
  );
}
