import Recipe from '../../models/model.recipe.js';
import User from '../../models/model.user.js';

const saveRecipeToUser = async (req, res) => {
	const { userId, recipeId } = req.body;

	await User.findOneAndUpdate(
		{ _id: userId },
		{ $addToSet: { savedRecipes: recipeId } },
		{ new: true }
	)
		.then((result) => {
			res.json(result);
		})
		.catch((error) => res.json(error));

	await Recipe.findOneAndUpdate(
		{ _id: recipeId },
		{ $inc: { saveCount: 1 } },
		{ new: true }
	).catch((error) => res.json(error));
};

export default saveRecipeToUser;
