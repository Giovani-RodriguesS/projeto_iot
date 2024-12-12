'use client';
import React, { useState } from "react";
import "@/style/styles.css";
import axios from "axios";

export default function Profile() {
    const [email, setUserEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const updateUserByEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Busca o usuário pelo email
            const userResponse = await axios.get('http://localhost/api/usuario'); // Ajuste a rota conforme necessário
            const users = userResponse.data;

            const foundUser = users.find((user: { email: string }) => user.email === email);
            if (!foundUser) {
                setErrorMessage('Usuário não encontrado.');
                setSuccessMessage('');
                return;
            }

            console.log('Usuário encontrado:', foundUser);

            // Gera uma nova senha
            const novasenha = gerarSenhaAleatoria(10);

            // Atualiza a senha via API
            await axios.put(`http://localhost/api/usuario/${foundUser.id}/password?newPassword=${novasenha}`,);

            // Envia o email via API
            await axios.post('/api/send-email', {
                email: foundUser.email,
                novasenha,
            });

            setSuccessMessage('Senha atualizada e email enviado com sucesso.');
            setErrorMessage('');
        } catch (error) {
            console.error(error);
            setErrorMessage('Ocorreu um erro ao atualizar a senha.');
            setSuccessMessage('');
        }
    };

    function gerarSenhaAleatoria(comprimento: number) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        let senha = '';
        for (let i = 0; i < comprimento; i++) {
            const indice = Math.floor(Math.random() * caracteres.length);
            senha += caracteres.charAt(indice);
        }
        return senha;
    }

    return (
        <main className="flex justify-center items-center h-screen bg-slate-800">
            <div className="w-full max-w-md p-6 sm:p-8 bg-slate-900 bg-opacity-75 rounded-lg shadow-lg">
                <h2 className="text-2xl font-extrabold mb-4 md:mb-2 text-white text-center">Recuperar Senha</h2>
                <h1 className="text-center text-sm md:text-base text-gray-300 mt-5">Para recuperar sua senha, preencha o campo abaixo com seu e-mail cadastrado</h1>

                <form onSubmit={updateUserByEmail}>
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

                    {/* Mensagens de erro/sucesso */}
                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

                    {/* Botão de Enviar */}
                    <div className="text-center mt-8">
                        <button
                            type="submit"
                            className="w-full p-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-300 text-white font-semibold"
                        >
                            Enviar
                        </button>
                    </div>

                    {/* Link login */}
                    <div className="text-center mt-6">
                        <a href="/login" className="text-white hover:underline">Voltar</a>
                    </div>
                </form>
            </div>
        </main>
    );
}