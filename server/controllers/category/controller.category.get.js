import Category from '../../models/model.category.js';

const getCategories = async (req, res) => {
	await Category.find()
		.then((result) => res.json(result))
		.catch((error) => res.json(error));
};

export default getCategories;
