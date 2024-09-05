import Recipe from '../../models/model.recipe.js';
import addRecipeToUser from '../user/controller.user.addRecipe.js';

const postRecipe = async (req, res) => {
	const recipeData = JSON.parse(req.body.recipeData);
	const imageName = req.file.filename;

	const {
		recipeName,
		category,
		postedBy,
		ingredients,
		calory,
		instructions,
		properties,
	} = recipeData;

	const date = new Date();

	const newRecipe = new Recipe({
		recipeName: recipeName,
		category: category,
		postedBy: postedBy,
		ingredients: ingredients,
		calory: calory,
		instructions: instructions,
		properties: properties,
		datePosted: date,
		image: imageName,
	});

	console.log(newRecipe);

	await newRecipe
		.save()
		.then((result) => {
			const { postedBy: userId } = req.body;
			const { _id: recipeId } = result;
			addRecipeToUser(userId, recipeId);
			res.json(result);
		})
		.catch((error) => res.json(error));
};

export default postRecipe;
