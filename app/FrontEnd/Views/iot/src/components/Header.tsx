// Header.tsx
import React from "react";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

interface HeaderProps {
  title: string;
  username?: string;
}

export default function Header({ title, username }: HeaderProps) {
  return (
    <header className="header flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
      <div className="header-left flex items-center">
        {username && (
          <div className="flex items-center mr-4 space-x-2">
            <Image
              src="/images/profiles/user.jpg"
              width={48}
              height={48}
              alt="user profile"
              className="photo rounded-full w-10 h-10"
            />
            <span className="user-name text-gray-700 dark:text-gray-300 whitespace-nowrap">Bem-vindo, {username}</span>
          </div>
        )}
      </div>
       {/* Div para centralizar o título */}
       <div className="flex justify-center w-full">
        <h1 className="text-2xl md:text-3xl text-black dark:text-white">{title}</h1>
      </div>

      <div className="header-right flex items-center">
        <ThemeToggle /> {/* Botão de alternância de tema */}
      </div>
    </header>
  );
}
