import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
	propertyName: {
		type: String,
		required: true,
	},
});

const Property = new mongoose.model('Property', propertySchema);

export default Property;
