import Comment from '../../models/model.comment.js';
import Recipe from '../../models/model.recipe.js';

const postComment = async (req, res) => {
	const { userId, recipeId, comment } = req.body;

	const date = new Date();

	const newComment = new Comment({
		postedBy: userId,
		comment: comment,
		datePosted: date,
		recipe: recipeId,
	});

	await newComment
		.save()
		.then((result) => {
			res.json(result);
		})
		.catch((error) => res.json(error));
};

export default postComment;
