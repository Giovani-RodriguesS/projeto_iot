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
            from: 'irrigacaosmart48@gmail.com', // Verifique se este endereço está autorizado no SendGrid
            subject: 'Sua nova senha',
            text: `Sua nova senha é: ${novasenha}`,
            html: `<p>Sua nova senha é: <strong>${novasenha}</strong></p>`, // Opcional: e-mail com formatação HTML
        };

        console.log(msg);

        await sgMail.send(msg);

        return NextResponse.json({ message: 'Email enviado com sucesso' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Erro ao enviar email', error }, { status: 500 });
    }
}