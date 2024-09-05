import Recipe from '../../models/model.recipe.js';

const getRecipes = async (req, res) => {
	await Recipe.find()
		.then((result) => res.json(result))
		.catch((error) => res.json(error));
};

export default getRecipes;
