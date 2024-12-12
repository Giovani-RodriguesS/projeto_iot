import { NextResponse } from 'next/server';

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey('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');

export async function POST(request: Request) {
    try {
        const { email, novasenha } = await request.json();

        if (!email || !novasenha) {
            return NextResponse.json({ message: 'Dados incompletos' }, { status: 400 });
        }

        const msg = {
            to: email,
            from: 'gabrielbrizola13@gmail.com', // Verifique se este endereço está autorizado no SendGrid
            subject: 'Sua nova senha',
            text: `Sua nova senha é: ${novasenha}`,
            html:`
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <table style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <thead>
                    <tr>
                        <th style="background-color: #007BFF; color: white; padding: 16px; font-size: 24px; text-align: center;">
                            Irrigação Smart
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 16px; text-align: center;">
                            <p style="font-size: 18px; margin: 0 0 16px;">Olá,</p>
                            <p style="font-size: 16px; margin: 0 0 16px;">
                                Sua nova senha foi gerada com sucesso. Use a senha abaixo para acessar sua conta:
                            </p>
                            <p style="font-size: 20px; color: #007BFF; font-weight: bold; margin: 16px 0;">
                                ${novasenha}
                            </p>
                            <p style="font-size: 14px; margin: 16px 0 0; color: #666;">
                                Por motivos de segurança, recomendamos que você altere sua senha após o login.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f8f8f8; padding: 16px; text-align: center; font-size: 12px; color: #999;">
                            <p style="margin: 0;">© 2024 Irrigação Smart. Todos os direitos reservados.</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `, //e-mail com formatação HTML
        };

        console.log(msg);

        await sgMail.send(msg);

        return NextResponse.json({ message: 'Email enviado com sucesso' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Erro ao enviar email', error }, { status: 500 });
    }
}