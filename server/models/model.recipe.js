import mongoose from 'mongoose';
import Category from './model.category.js';

const recipeSchema = new mongoose.Schema({
	recipeName: {
		type: String,
		required: true,
	},
	category: {
		type: mongoose.ObjectId,
		ref: 'Category',
	},
	postedBy: {
		type: mongoose.ObjectId,
		ref: 'User',
	},
	saveCount: {
		type: Number,
		required: true,
		default: 0,
	},
	datePosted: {
		type: Date,
		required: true,
	},
	ingredients: [
		{
			type: String,
			required: true,
			default: [],
		},
	],
	calory: {
		type: Number,
		required: true,
	},
	instructions: {
		type: String,
		required: true,
	},
	properties: [
		{
			type: mongoose.ObjectId,
			ref: 'Property',
			default: [],
		},
	],
	image: String,
});

const Recipe = new mongoose.model('Recipe', recipeSchema);

export default Recipe;
