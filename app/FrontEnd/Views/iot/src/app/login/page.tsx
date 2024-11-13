'use client'
import React, { useState } from "react";
import "@/style/styles.css";
import { useRouter } from 'next/navigation';
import api from "@/axiosConfig";

export default function Profile() {
    const [email, setUserEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVisible, setPasswordVisible] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response = await api.get('http://localhost:3000/login/api',{
               params:{email,senha}
            });
            if (response.status === 200){
                router.push('/home')
            }
        }catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };

    return (
        <main className="flex justify-center items-center h-screen bg-slate-800">
            <div className="relative flex w-full max-w-5xl h-3/4 bg-slate-800 rounded-lg shadow-lg overflow-hidden">

                {/* Imagem de Fundo (lado esquerdo) */}
                <div className="w-1/2 relative">
                    <img
                        src="images/login/irrigation.jpg"
                        alt="Imagem de fundo"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent"></div>
                </div>

                {/* Seção do Formulário (lado direito) */}
                <div className="w-1/2 p-8 bg-slate-900 bg-opacity-75 flex flex-col justify-center rounded-lg">
                    <h2 className="text-3xl font-extrabold mb-6 text-white text-center">Bem-Vindo!</h2>
                    
                    {/* Adicione a função handleSubmit no evento onSubmit do formulário */}
                    <form onSubmit={handleSubmit}> 
                        <div className="mb-4">
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

                       {/* Campo Senha */}
                       <div className="mb-4">
                            <label htmlFor="password" className="text-gray-400 block mb-2">Senha</label>
                            <div className="relative w-full">
                                <input
                                    type={senhaVisible ? "text" : "password"} // Alterna entre texto e senha
                                    id="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    className="w-full p-3 bg-slate-800 text-white rounded-md pr-10"
                                    placeholder="Digite sua senha"
                                />
                                {/* Ícone de Olho no final do campo */}
                                <span
                                    onClick={() => setPasswordVisible(!senhaVisible)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                                >
                                    <i className={`pi ${senhaVisible ? 'pi-eye-slash' : 'pi-eye'}`} />
                                </span>
                            </div>
                        </div>

                        <div className="text-right mt-4">
                            <a href="#" className="text-white hover:underline">Esqueci minha senha</a>
                        </div>

                        <div className="text-center mt-10">
                            <button type="submit" className="w-full p-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-300 text-white font-semibold">
                                Entrar
                            </button>
                        </div>

                        <div className="text-center mt-6">
                            <a href="http://localhost:3000/register" className="text-white hover:underline">Ainda não tenho uma conta</a>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
