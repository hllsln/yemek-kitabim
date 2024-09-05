import Comment from '../../models/model.comment.js';

const getComments = async (req, res) => {
	await Comment.find()
		.then((result) => res.json(result))
		.catch((error) => res.json(error));
};

export default getComments;
