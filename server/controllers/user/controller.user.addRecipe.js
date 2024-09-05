import User from '../../models/model.user.js';

const addRecipeToUser = async (userId, recipeId) => {
	await User.findOneAndUpdate(
		{ _id: userId },
		{ $addToSet: { postedRecipes: recipeId } },
		{ new: true }
	);
};

export default addRecipeToUser;
