import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, message } = body;

    if (!firstName?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const fullName = [firstName.trim(), lastName?.trim()].filter(Boolean).join(' ');

    await transporter.sendMail({
      from: `"BacklinkCAT" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      replyTo: `"${fullName}" <${email.trim()}>`,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `Contact form message from ${fullName}`,
      text: message.trim(),
      html: `
        <p><strong>From:</strong> ${fullName} &lt;${email.trim()}&gt;</p>
        <p><strong>Message:</strong></p>
        <p>${message.trim().replace(/\n/g, '<br/>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
