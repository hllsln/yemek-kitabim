import User from '../../models/model.user.js';
import bcrypt from 'bcrypt';
import passport from 'passport';

const logout = (req, res) => {
	req.logout((error) => {
		if (error) {
			return res.status(500).json({ message: 'Logout failed.' });
		}
		res.status(200).json({ message: 'Logout successful.' });
	});
};

export default logout;
