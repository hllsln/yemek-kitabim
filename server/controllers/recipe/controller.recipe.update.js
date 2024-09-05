import Recipe from '../../models/model.recipe.js';

const updateRecipe = async (req, res) => {
	const recipeData = JSON.parse(req.body.recipeData);
	if (req.file) {
		const imageName = req.file.filename;
		recipeData.image = imageName;
	}

	const _id = recipeData._id;

	await Recipe.replaceOne({ _id }, recipeData, { new: true })
		.then((result) => res.json({ ...result, updatedData: recipeData }))
		.catch((error) => res.json(error));
};

export default updateRecipe;
