'use client'
import React, { useState } from "react";
import "@/style/styles.css";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Dialog } from 'primereact/dialog';

export default function Profile() {
    const [email, setUserEmail] = useState('');
    const [showPopup, setShowPopup] = useState(false); // Controla a exibição do popup

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    return (
        <main className="flex justify-center items-center h-screen bg-slate-800">
            <div className="w-full max-w-md p-6 sm:p-8 bg-slate-900 bg-opacity-75 rounded-lg shadow-lg">
                <h2 className="text-2xl font-extrabold mb-4 md:mb-2 text-white text-center">Recuperar Senha</h2>
                <h1 className="text-center text-sm md:text-base text-gray-300 mt-5">Para recuperar sua senha, preencha o campo abaixo com seu e-mail cadastrado</h1>

                <form onSubmit={handleSubmit}>
                    {/* Campo Email */}
                    <div className="mb-4 mt-8">
                        <label htmlFor="email" className="text-gray-400">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setUserEmail(e.target.value)}
                            required
                            className="w-full p-3 mt-2 bg-slate-800 text-white rounded-md"
                            placeholder="Digite seu email"
                        />
                    </div>

                    {/* Botão de Enviar */}
                    <div className="text-center mt-8">
                        <a href="http://localhost:3000/login">
                            <button
                                type="button"
                                className="w-full p-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-300 text-white font-semibold"
                            >
                                Enviar
                            </button>
                        </a>
                    </div>

                    {/* Link login */}
                    <div className="text-center mt-6">
                        <a href="http://localhost:3000/login" className="text-white hover:underline">Voltar</a>
                    </div>
                </form>
            </div>

            <Dialog
                header=""
                visible={showPopup}
                style={{
                    width: '25vw',
                    textAlign: 'center',
                    position: 'absolute',
                    top: '2%',
                    left: '89%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(255, 99, 71, 0.8)',
                    borderRadius: '8px',
                }}
                draggable={false}
                closable={false}
                onHide={() => setShowPopup(false)}
            >
                <div className="p-4 rounded-md flex items-center justify-center">
                    <p className="text-sm text-white font-bold">E-mail inválido</p>
                </div>
            </Dialog>
        </main>

    );
}
