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
          <div className="flex items-center mr-4">
            <span className="user-name text-gray-700 dark:text-gray-300 mr-2">Bem-vindo, {username}</span>
            <Image
              src="/images/profiles/user.jpg"
              width={48}
              height={48}
              alt="user profile"
              className="photo rounded-full"
            />
          </div>
        )}
      </div>
       {/* Div para centralizar o título */}
       <div className="flex justify-center w-full">
        <h1 className="text-xl text-black dark:text-white">{title}</h1>
      </div>

      <div className="header-right flex items-center">
        <ThemeToggle /> {/* Botão de alternância de tema */}
      </div>
    </header>
  );
}
