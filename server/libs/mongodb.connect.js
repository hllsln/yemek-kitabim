import mongoose from 'mongoose';
import 'dotenv/config';

const databaseURL = process.env.DATABASE_URL;

const connectDB = async () => {
	await mongoose
		.connect(databaseURL)
		.then(() => console.log('Connected to database'))
		.catch((error) => console.log(error));
};

export default connectDB;
