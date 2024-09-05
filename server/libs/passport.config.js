import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/model.user.js';

passport.use(
	new Strategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			try {
				const user = await User.findOne({ email });

				if (!user) {
					return done(null, false, { message: 'Incorrect email.' });
				}

				const passwordMatch = await bcrypt.compare(
					password,
					user.password
				);

				if (passwordMatch) {
					return done(null, user);
				} else {
					return done(null, false, {
						message: 'Incorrect password.',
					});
				}
			} catch (error) {
				return done(error);
			}
		}
	)
);

passport.serializeUser((user, cb) => {
	cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
	try {
		const user = await User.findById(id);
		cb(null, user);
	} catch (error) {
		cb(error);
	}
});

export default passport;
