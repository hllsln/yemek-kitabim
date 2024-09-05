import mongoose from 'mongoose';
import Property from './model.property.js';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: String,
	membershipDate: {
		type: Date,
		required: true,
	},
	preferences: [
		{
			type: mongoose.ObjectId,
			ref: 'Property',
			default: [],
		},
	],
	minCalory: { type: Number, default: 0 },
	maxCalory: { type: Number, default: 0 },
	postedRecipes: [
		{
			type: mongoose.ObjectId,
			ref: 'Recipe',
			default: [],
		},
	],
	savedRecipes: [
		{
			type: mongoose.ObjectId,
			ref: 'Recipe',
			default: [],
		},
	],
	avatar: String,
});

const User = new mongoose.model('User', userSchema);

export default User;
