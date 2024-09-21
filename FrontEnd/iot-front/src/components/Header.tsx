'use client'

interface HeaderProps {
    title: string;
    user?: string;
}

export default function Header({title, user}: HeaderProps) {
    return (
        <div>
            <header className="header">
                <h1>{title}{user && <span> - Olá, {user}</span>}</h1>
            </header>
        </div>
    
    );

}