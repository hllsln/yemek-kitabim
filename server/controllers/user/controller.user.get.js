import User from '../../models/model.user.js';

const getUsers = async (req, res) => {
	await User.find(req.query)
		.then((result) => res.json(result))
		.catch((error) => res.json(error));
};

export default getUsers;
