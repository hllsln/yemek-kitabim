import User from '../../models/model.user.js';

const deleteUser = async (req, res) => {
	const { userId } = req.body;

	await User.findOneAndDelete({ _id: userId })
		.then((result) => res.json(result))
		.catch((error) => res.json(error));
};

export default deleteUser;
