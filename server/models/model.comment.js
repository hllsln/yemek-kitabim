import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
	comment: {
		type: String,
		required: true,
	},
	postedBy: {
		type: mongoose.ObjectId,
		ref: 'User',
	},
	datePosted: {
		type: Date,
		required: true,
	},
	recipe: {
		type: mongoose.ObjectId,
		ref: 'Recipe',
	},
});

const Comment = new mongoose.model('Comment', commentSchema);

export default Comment;
