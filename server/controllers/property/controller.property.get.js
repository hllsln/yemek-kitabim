import Property from '../../models/model.property.js';

const getProperties = async (req, res) => {
	await Property.find()
		.then((result) => res.status(200).json(result))
		.catch((error) => res.json(error));
};

export default getProperties;
