import Recipe from '../../models/model.recipe.js';

const searchRecipes = async (req, res) => {
	let filters = req.body;
	if (req.body.recipeName) {
		filters = {
			...req.body,
			recipeName: { $regex: req.body.recipeName, $options: 'i' },
		};
	}

	await Recipe.find(filters)
		.then((result) => {
			res.json(result);
		})
		.catch((error) => res.json(error));
};

export default searchRecipes;
