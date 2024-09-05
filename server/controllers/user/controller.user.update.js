import User from '../../models/model.user.js';
import bcrypt from 'bcrypt';

const updateUser = async (req, res) => {
	console.log(req.body);

	const userData = JSON.parse(req.body.userData);

	if (req.file) {
		const imageName = req.file.filename;
		userData.avatar = imageName;
	}

	const {
		userId,
		username,
		email,
		name,
		password,
		avatar,
		preferences,
		minCalory,
		maxCalory,
	} = userData;

	const updatedData = {
		minCalory: minCalory,
		maxCalory: maxCalory,
	};
	updatedData.avatar = avatar;

	const existingEmail = await User.findOne({ email });
	if (existingEmail && existingEmail._id !== userId) {
		return res.status(400).json({
			type: 'email',
			message: 'Email already registered.',
		});
	}

	const existingUsername = await User.findOne({ username });
	if (existingUsername && existingUsername._id !== userId) {
		return res.status(400).json({
			type: 'username',
			message: 'Username already registered.',
		});
	}

	if (password) {
		const hashedPassword = await bcrypt.hash(password, 10);
		updatedData.password = hashedPassword;
	}

	if (email) {
		updatedData.email = email;
	}

	if (username) {
		updatedData.username = username;
	}

	if (name) {
		updatedData.name = name;
	}

	await User.findOneAndUpdate(
		{ _id: userId },
		{ $set: { ...updatedData, preferences: preferences } },
		{ new: true }
	)
		.then((result) => {
			res.status(200).json({
				message: 'User updated succesfully.',
				user: result,
			});
		})
		.catch((error) => res.json(error));
};

export default updateUser;
