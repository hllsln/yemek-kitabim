import User from '../../models/model.user.js';
import bcrypt from 'bcrypt';
import passport from 'passport';

const register = async (req, res) => {
	const { username, email, password } = req.body;
	const preferences = [
		'653bff1f1680a89d2a2e8de9',
		'653bff1f1680a89d2a2e8de7',
		'653bff1f1680a89d2a2e8deb',
		'653bff1f1680a89d2a2e8de6',
		'653bff1f1680a89d2a2e8de8',
		'653bff1f1680a89d2a2e8dea',
		'653bff1f1680a89d2a2e8dec',
		'653bff1f1680a89d2a2e8ded',
	];

	try {
		const existingEmail = await User.findOne({ email });

		if (existingEmail) {
			return res.status(400).json({
				type: 'email',
				message: 'Email already registered.',
			});
		}

		const existingUsername = await User.findOne({ username });

		if (existingUsername) {
			return res.status(400).json({
				type: 'username',
				message: 'Username already registered.',
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const date = new Date();

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			membershipDate: date,
			postedRecipes: [],
			savedRecipes: [],
			preferences: preferences,
		});

		await newUser.save();

		res.status(200).json({
			message: 'Registration successful.',
			user: newUser,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			type: 'unknown',
			message: 'Registration failed.',
			error,
		});
	}
};

export default register;
