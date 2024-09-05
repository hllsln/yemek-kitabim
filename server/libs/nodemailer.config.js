import nodemailer from 'nodemailer';
import 'dotenv/config';

const user = process.env.USER;
const pass = process.env.PASS;

const transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: user,
		pass: pass,
	},
});

async function sendMail(email, generatedPassword) {
	const info = await transporter.sendMail({
		from: `Şifre Yenileme" <${user}>`,
		to: email,
		subject: 'Yeni Şifreniz',
		text: `Yeni şifrenizi kullanarak giriş yapabilirsiniz: ${generatedPassword}`,
		html: `<b>Yeni şifrenizi kullanarak giriş yapabilirsiniz: ${generatedPassword}</b>`,
	});

	console.log('Message sent: %s', info);
}

export default sendMail;
