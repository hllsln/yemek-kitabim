import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './libs/mongodb.connect.js';
import passport from 'passport';
import session from 'express-session';
import passportConfig from './libs/passport.config.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routeAuth from './routes/route.auth.js';
import routeUser from './routes/route.user.js';
import routeRecipe from './routes/route.recipe.js';
import routeProperty from './routes/route.property.js';
import routeCategory from './routes/route.category.js';
import routeComment from './routes/route.comment.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT;
const sessionSecret = process.env.SESSION_SECRET;

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: sessionSecret,
		resave: false,
		saveUninitialized: true,
	})
);

app.use(cookieParser(sessionSecret));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

connectDB();

app.use('/auth', routeAuth);
app.use('/data/users', routeUser);
app.use('/data/recipes', routeRecipe);
app.use('/data/properties', routeProperty);
app.use('/data/categories', routeCategory);
app.use('/data/comments', routeComment);

app.listen(port, () => {
	console.log('Server started on port', port);
});
