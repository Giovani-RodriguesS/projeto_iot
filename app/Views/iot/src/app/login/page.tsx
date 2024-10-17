import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import React from "react";
import Image from "next/image";

export default function Profile() {
    return (

        <main className="flex-1 flex justify-center items-center h-screen bg-gradient-to-b from-slate-700 to-black">

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
                <h2 className="text-2xl  font-extrabold mb-6 text-center text-black">Welcome to Sistem!</h2>
                <h3 className="text-sm mb-6 text-center font-serif">Enter your details to access.</h3>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="formLabel">Username</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                            <i className="pi pi-user text-black-400"></i>
                            <input type="text" id="username" name="username" required className="formInput" placeholder="Enter your username" />
                        </div>
                    </div>


                    <div className="mb-6">
                        <label htmlFor="senha" className="formLabel">Password</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                            <i className="pi pi-lock text-black-400"></i>

                        <input type="password" id="password" name="senha" required className="formInput" placeholder="**********" />
                        </div>
                    </div>

                    <div className="text-center">
                        <a href="http://localhost:3000/" className="btnSave">Login</a>
                    </div>

                    <div className="text-center mt-4">
                        <a href="/#" className="text-black-500 hover:underline">Forgot My Password</a>
                    </div>


                </form>
            </div>

        </main>
    );
}






// Tela de login:
//Componentes:
//Campos de entrada para nome de usuario e senha.
//Botão de Login.
//Link para "Esqueci minha senha".

