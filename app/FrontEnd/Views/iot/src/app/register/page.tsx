'use client';
import React, { useState } from "react";
import { InputMask } from "primereact/inputmask";
import 'primeicons/primeicons.css';
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Dialog } from 'primereact/dialog';

export default function StyledMaskDemo() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cargo, setCargo] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaVisible, setPasswordVisible] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [showPopup, setShowPopup] = useState(false); // Controla a exibição do popup
    const router = useRouter();

    const formattedTelefone = telefone.replace(/\D/g, '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const usuarioDto = {
            nome,
            email,
            cargo,
            telefone: formattedTelefone,
            senha
        };
        try {
            const response = await axios.post('http://localhost/api/usuario', usuarioDto);
            console.log('Usuário criado:', response.data);
            setShowPopup(true);
        
            // Aguardar os 3 segundos antes de redirecionar
            await new Promise((resolve) => setTimeout(resolve, 2000));
            
            setShowPopup(false); //esconde o popup após a espera
            setResponseData(response.data);
            router.push('http://localhost:3000/login');
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <main className="flex justify-center items-center min-h-screen bg-slate-800 p-4">
            <div className="relative flex flex-col md:flex-row w-full max-w-4xl h-auto md:h-3/4 bg-slate-800 rounded-lg shadow-lg overflow-hidden">

                {/* Seção do Formulário (lado esquerdo) */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 bg-slate-900 bg-opacity-75 flex flex-col justify-center">
                    <h2 className="text-2xl font-extrabold mb-4 md:mb-2 text-white text-center">Criar sua Conta</h2>
                    <h1 className="text-center text-sm md:text-base text-gray-300">Preencha seus dados</h1>
                    <form className="space-y-4" onSubmit={handleSubmit}>

                        {/* Campo Nome */}
                        <div>
                            <label htmlFor="nome" className="text-gray-400 block mb-1">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                className="w-full p-2 bg-slate-800 text-white rounded-md"
                                placeholder="Digite seu nome"
                            />
                        </div>

                        {/* Campo E-mail */}
                        <div>
                            <label htmlFor="email" className="text-gray-400 block mb-2">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 bg-slate-800 text-white rounded-md"
                                placeholder="Digite seu email"
                            />
                        </div>

                        {/* Campo Cargo */}
                        <div>
                            <label htmlFor="cargo" className="text-gray-400 block mb-2">Cargo</label>
                            <input
                                type="text"
                                id="cargo"
                                value={cargo}
                                onChange={(e) => setCargo(e.target.value)}
                                required
                                className="w-full p-2 bg-slate-800 text-white rounded-md"
                                placeholder="Digite seu cargo"
                            />
                        </div>

                        {/* Campo Telefone */}
                        <div>
                            <label htmlFor="cargo" className="text-gray-400 block mb-2">Telefone</label>
                            <InputMask
                                id="phone"
                                value={telefone}
                                onChange={(e) => setTelefone(e.value as string)}
                                mask="(99) 99999-9999"
                                placeholder="(99) 99999-9999"
                                className="w-full p-2 bg-slate-800 text-white rounded-md"
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
                                    className="w-full p-2 bg-slate-800 text-white rounded-md pr-10"
                                    placeholder="Digite sua senha"
                                />
                                <span
                                    onClick={() => setPasswordVisible(!senhaVisible)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                                >
                                    <i className={`pi ${senhaVisible ? 'pi-eye-slash' : 'pi-eye'}`} />
                                </span>
                            </div>
                        </div>

                        {/* Botão de Cadastro */}
                        <div className="text-center">
                            <button type="submit" className="w-full mt-5 p-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-300 text-white font-semibold">
                                Cadastrar
                            </button>
                        </div>

                        {/* Link "Já tenho uma conta" */}
                        <div className="text-right mt-6">
                            <a href="http://localhost:3000/login" className="text-white hover:underline">Já tenho uma conta</a>
                        </div>

                    </form>
                </div>

                {/* Imagem de Fundo (lado direito) */}
                <div className="hidden md:block w-1/2 h-auto relative">
                    <img
                        src="images/register/irrigation.jpg"
                        alt="Imagem de fundo"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent"></div>
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
                    backgroundColor: 'rgba(144, 238, 144, 0.8)',
                    borderRadius: '8px',
                }}
                draggable={false}
                closable={false}
                onHide={() => setShowPopup(false)}
            >
                <div className="p-4 rounded-md flex items-center justify-center">
                    <p className="text-sm text-white font-bold">Usuário cadastrado com sucesso!</p>
                </div>
            </Dialog>
        </main>

    );
}
