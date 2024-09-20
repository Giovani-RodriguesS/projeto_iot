'use client'

import { Span } from "next/dist/trace";

interface HeaderProps {
    title: string;
    user?: string;
}

export default function Header({title, user}: HeaderProps) {
    return (
        <div>
            <header className="w-full h-full bg-gray-600 p-4 rounded-t-lg text-white font-mono">
                <h1>{title}{user && <span> - Olá, {user}</span>}</h1>
            </header>
        </div>
    
    );

}