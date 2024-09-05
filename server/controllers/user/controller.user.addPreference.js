import User from '../../models/model.user.js';

const addPreferenceToUser = async (req, res) => {
	const { propertyId } = req.body;

	await User.findOneAndUpdate(
		{ _id: id },
		{ $addToSet: { preferences: propertyId } }
	)
		.then((result) => res.json(result))
		.catch((error) => res.json(error));
};

export default addPreferenceToUser;
