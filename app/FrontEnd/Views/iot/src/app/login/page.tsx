'use client'
import React, { useState } from "react";
import "@/style/styles.css";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Dialog } from 'primereact/dialog';

export default function Profile() {
    const [email, setUserEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVisible, setPasswordVisible] = useState(false);
    const [showPopup, setShowPopup] = useState(false); // Controla a exibição do popup
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const usuarioDto = {
            email,
            senha
        };

        try {
            const response = await axios.post('http://localhost/api/Usuario/login', usuarioDto);

            const { nomeUsuario } = response.data; // Extraindo o nome do usuário

            console.log(nomeUsuario);

             // Armazene o nome em localStorage ou em um estado global/contexto
            localStorage.setItem('nomeUsuario', nomeUsuario);


            console.log('Usuário logado:', response.data);
            router.push('http://localhost:3000/home');
        } catch (error) {
            setShowPopup(true); 
            setTimeout(() => setShowPopup(false), 2000); 
        }
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-slate-800 p-4">
            <div className="relative flex flex-col md:flex-row w-full max-w-4xl h-auto md:h-3/4 bg-slate-800 rounded-lg shadow-lg overflow-hidden">

                {/* Imagem de Fundo (lado esquerdo) */}
                <div className="hidden md:block w-full md:w-1/2 relative">
                    <img
                        src="images/login/irrigation.jpg"
                        alt="Imagem de fundo"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent"></div>
                </div>

                {/* Seção do Formulário (lado direito) */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 bg-slate-900 bg-opacity-75 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-white text-center">Bem-Vindo!</h2>

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
                                    type={senhaVisible ? "text" : "password"}
                                    id="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    className="w-full p-3 bg-slate-800 text-white rounded-md pr-10"
                                    placeholder="Digite sua senha"
                                />
                                {/* Ícone para exibir ou ocultar a senha */}
                                <span
                                    onClick={() => setPasswordVisible(!senhaVisible)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                                >
                                    <i className={`pi ${senhaVisible ? 'pi-eye-slash' : 'pi-eye'}`} />
                                </span>
                            </div>
                        </div>

                        <div className="text-right mt-4">
                            <a href="http://localhost:3000/forgotpassword" className="text-white hover:underline">Esqueci minha senha</a>
                        </div>

                        <div className="text-center mt-8">
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
                <p className="text-sm text-white font-bold">E-mail ou Senha incorretos</p>
            </div>
            </Dialog>
        </main>
    );
}
