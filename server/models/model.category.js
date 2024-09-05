import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
	categoryName: {
		type: String,
		required: true,
	},
});

const Category = new mongoose.model('Category', categorySchema);

export default Category;
