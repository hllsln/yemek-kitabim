import User from '../../models/model.user.js';

const deleteRecipeFromUser = async (userId, recipeId) => {
	await User.findOneAndUpdate(
		{ _id: userId },
		{ $pull: { postedRecipes: recipeId } }
	).then((result) => console.log(result));
};

export default deleteRecipeFromUser;
