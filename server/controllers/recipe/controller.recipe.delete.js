import Recipe from '../../models/model.recipe.js';
import deleteRecipeFromUser from '../user/controller.user.deleteRecipe.js';

const deleteRecipe = async (req, res) => {
	const { recipeId } = req.body;

	await Recipe.findOneAndDelete({ _id: recipeId })
		.then((result) => {
			const { postedBy: userId } = result;
			deleteRecipeFromUser(userId, recipeId);
			res.json(result);
		})
		.catch((error) => res.json(error));
};

export default deleteRecipe;
