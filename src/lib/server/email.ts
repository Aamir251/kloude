import nodemailer, { type Transporter } from 'nodemailer';
import { env } from '$env/dynamic/private';

type Mail = { to: string; subject: string; text: string; html: string };

// Lazily built so a missing SMTP config only matters when a mail is actually sent.
let transporter: Transporter | undefined;

function getTransporter() {
	if (!env.SMTP_HOST) return null;
	transporter ??= nodemailer.createTransport({
		host: env.SMTP_HOST,
		port: Number(env.SMTP_PORT ?? 587),
		secure: Number(env.SMTP_PORT) === 465,
		auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined
	});
	return transporter;
}

export async function sendEmail(mail: Mail) {
	const transport = getTransporter();

	// No SMTP configured: print the mail so the flow is usable in local dev.
	if (!transport) {
		console.log(`[email] SMTP_HOST not set, not sending. To: ${mail.to}\n${mail.text}`);
		return;
	}

	await transport.sendMail({ from: env.EMAIL_FROM ?? env.SMTP_USER, ...mail });
}

export function resetPasswordEmail(name: string, url: string): Omit<Mail, 'to'> {
	return {
		subject: 'Reset your Kloude password',
		text: `Hi ${name},\n\nUse this link to reset your password (valid for 1 hour):\n${url}\n\nIf you didn't request this, you can ignore this email.`,
		html: `<p>Hi ${name},</p>
<p>Use the button below to reset your password. The link is valid for 1 hour.</p>
<p><a href="${url}" style="display:inline-block;padding:10px 18px;background:#6366f1;color:#fff;border-radius:8px;text-decoration:none">Reset password</a></p>
<p>If you didn't request this, you can ignore this email.</p>`
	};
}
