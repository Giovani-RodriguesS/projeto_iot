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
    <header className="header flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
      {/* Parte esquerda (saudação do usuário) */}
      <div className="header-left flex items-center">
        {username && (
          <div className="flex items-center space-x-2">
            <Image
              src="/images/profiles/user.jpg"
              width={48}
              height={48}
              alt="user profile"
              className="photo rounded-full w-10 h-10"
            />
            <span className="user-name text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Bem-vindo, {username}
            </span>
          </div>
        )}
      </div>

      {/* Parte central (título) */}
      <div className="flex-grow flex justify-center">
        <h1 className="text-2xl md:text-3xl text-black dark:text-white">{title}</h1>
      </div>

      {/* Parte direita (alternância de tema) */}
      <div className="header-right flex items-center">
        <ThemeToggle /> {/* Botão de alternância de tema */}
      </div>
    </header>
  );
}
