import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import React from "react";
import Image from "next/image";

export default function Profile() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header title="Usuários" username="Letícia Anhaia" />
                <main className="flex-1 flex justify-center items-center bg-slate-800">

                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
                        <h2 className="text-2xl font-bold mb-6 text-center">Editar Perfil</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="formLabel">
                                    Nome
                                </label>
                                <input type="text" id="name" name="name" required className="formInput" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="formLabel">
                                    E-mail
                                </label>
                                <input type="email" id="email" name="email" required className="formInput" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="senha" className="formLabel">
                                    Senha
                                </label>
                                <input type="password" id="password" name="senha" required className="formInput" />
                            </div>

                            <button type="submit" className="btnSave">Salvar</button>

                        </form>
                    </div>

                </main>
            </div>
        </div>
    );
}