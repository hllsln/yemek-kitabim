import User from '../../models/model.user.js';
import bcrypt from 'bcrypt';
import sendMail from '../../libs/nodemailer.config.js';
import generator from 'generate-password';

const forgotPassword = async (req, res) => {
	const { email } = req.body;

	try {
		const foundUser = await User.findOne({ email: email });

		if (foundUser) {
			const generatedPassword = generator.generate({
				length: 10,
				numbers: true,
			});

			console.log(generatedPassword);

			const hashedPassword = await bcrypt.hash(generatedPassword, 10);

			await User.updateOne(
				{ email: email },
				{
					password: hashedPassword,
				}
			);

			await sendMail(email, generatedPassword);
		}

		// Always respond with a generic success message
		res.status(200).json({
			message:
				'Eğer e-mail adresi kayıtlıysa yeni şifrenizi içeren bir mail alacaksınız.',
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export default forgotPassword;
