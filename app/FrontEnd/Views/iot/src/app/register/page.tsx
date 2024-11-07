'use client'

import Header from "@/components/Header";
import React, { useState } from "react";
import { Password } from 'primereact/password';



export default function ToggleMaskDemo() {
    const [value, setValue] = useState<string>('');

    return (
        <div className="flex">

            <div className="flex-1 bg-slate-800 h-screen">
                <Header title="Cadastro" username="Usuário" />
                <main>
                    <div className="flex gap-7 justify-center mt-20 ml-5 mr-5">

                        <div className=" w-1/1 p-8 bg-slate-900 bg-opacity-75 flex flex-col justify-center rounded-lg">
                            <h2 className="text-3xl font-extrabold mb-6 text-white text-center">Cadastre-se</h2>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="email" className="text-gray-400">Nome Completo</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full p-3 mt-2 bg-slate-800 text-white rounded-md"

                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="text-gray-400">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full p-3 mt-2 bg-slate-800 text-white rounded-md"

                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="text-gray-400">Nome de Usuário</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full p-3 mt-2 bg-slate-800 text-white rounded-md"

                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="text-gray-400">Senha</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="senha"
                                        required
                                        className="w-full p-3 mt-2 bg-slate-800 text-white rounded-md"
                                        placeholder="********"
                                    />
                                </div>


                                <div className="text-center mt-10">
                                    <button type="submit" className="w-full p-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-300 text-white font-semibold">
                                        Cadastrar
                                    </button>
                                </div>

                                <div className="text-center mt-6">
                                    <a href="#" className="text-white hover:underline">Possuo Cadastro</a>
                                </div>

                                <div className="card flex justify-content-center">
                                    <Password value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} toggleMask />
                                </div>

                            </form>
                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}