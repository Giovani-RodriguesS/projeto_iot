import React from "react";
import Image from "next/image";

interface HeaderProps {
    title: string;
    username?: string;
}

export default function Header({ title, username }: HeaderProps) {
    return (
        <header className="header">
            <div className="header-left">
                <h1>{title}</h1>
            </div>
            <div className="header-right">
                {username && 
                    <div className="flex">
                        <span className="user-name">Bem-vindo {username}</span>
                        <Image 
                            src="/images/profiles/user.jpg" width={48} height={0} alt="user profile"
                            className="photo"/>
                        </div>
                    }                
            </div>
        </header>
    );
}
