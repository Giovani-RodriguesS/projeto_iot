'use client';

import React, { useState } from "react";
import { InputMask } from "primereact/inputmask";
import 'primeicons/primeicons.css';
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function StyledMaskDemo() {
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/register', {
                name,
                email,
                phone,
                password,
            });

            if (response.status === 200) {
                console.log("Registro bem-sucedido:", response.data);
                router.push('/register');
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };

    return (
        <main className="flex justify-center items-center h-screen bg-slate-800">
            <div className="relative flex w-full max-w-5xl h-3/4 bg-slate-800 rounded-lg shadow-lg overflow-hidden">

                {/* Seção do Formulário (lado esquerdo) */}
                <div className="w-1/2 p-8 bg-slate-900 bg-opacity-75 flex flex-col justify-center rounded-lg">
                    <h2 className="text-3xl font-extrabold mb-6 text-white text-center">Criar sua Conta</h2>
                    <h1 className="text-center">Preencha seus dados</h1>
                    <form className="space-y-4" onSubmit={handleSubmit}>

                        {/* Campo Nome */}
                        <div>
                            <label htmlFor="nome" className="text-gray-400 block mb-2">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                required
                                className="w-full p-3 bg-slate-800 text-white rounded-md"
                                placeholder="Digite seu nome"
                            />
                        </div>

                        {/* Campo E-mail */}
                        <div>
                            <label htmlFor="email" className="text-gray-400 block mb-2">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full p-3 bg-slate-800 text-white rounded-md"
                                placeholder="Digite seu email"
                            />
                        </div>

                        {/* Campo Telefone */}
                        <div>
                            <label htmlFor="phone" className="text-gray-400 block mb-2">Telefone</label>
                            <InputMask
                                id="phone"
                                mask="(99) 99999-9999"
                                placeholder="(99) 99999-9999"
                                className="w-full p-3 bg-slate-800 text-white rounded-md"
                            />
                        </div>

                        {/* Campo Senha */}
                        <div className="mb-4">
                            <label htmlFor="password" className="text-gray-400 block mb-2">Senha</label>
                            <div className="relative w-full">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 bg-slate-800 text-white rounded-md pr-10"
                                    placeholder="Digite sua senha"
                                />
                                {/* Ícone de Olho no final do campo */}
                                <span
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                                >
                                    <i className={`pi ${passwordVisible ? 'pi-eye-slash' : 'pi-eye'}`} />
                                </span>
                            </div>
                        </div>

                        {/* Botão de Cadastro */}
                        <div className="text-center">
                            <button type="submit" className="w-full mt-5 p-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-300 text-white font-semibold">
                                Cadastrar
                            </button>
                        </div>

                    </form>
                </div>

                {/* Imagem de Fundo (lado direito) */}
                <div className="w-1/2 relative">
                    <img
                        src="images/register/irrigation.jpg"
                        alt="Imagem de fundo"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent"></div>
                </div>
            </div>
        </main>
    );
}
