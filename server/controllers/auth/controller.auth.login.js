import User from '../../models/model.user.js';
import bcrypt from 'bcrypt';
import passport from 'passport';

const login = (req, res) => {
	passport.authenticate('local', (error, user, info) => {
		if (error) {
			return res
				.status(400)
				.json({ type: 'unknown', message: info.message });
		}
		if (!user) {
			return res
				.status(400)
				.json({ type: 'incorrect', message: info.message });
		}
		req.logIn(user, (err) => {
			if (err) {
				return res.status(400).json({ type: 'password', message: err });
			}
			res.status(200).json({ message: 'Login successful.', user: user });
		});
	})(req, res);
};

export default login;
