import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState();
	const [authError, setAuthError] = useState();
	const [currentUser, setCurrentUser] = useState({});
	const [isUpdated, setIsUpdated] = useState();

	useEffect(
		() => {
			const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
			if (loggedInUser) {
				setIsLoggedIn(true);
				setCurrentUser(loggedInUser);
			}
		},
		[],
		[isUpdated]
	);

	const loginUser = async (data) => {
		axios({
			method: 'post',
			url: 'http://localhost:5000/auth/login',
			data: data,
		})
			.then((result) => {
				if (result) {
					setCurrentUser(result.data.user);
					setIsLoggedIn(true);
					sessionStorage.setItem(
						'user',
						JSON.stringify(result.data.user)
					);
				}
			})
			.catch((error) => {
				if (error.response.data.type === 'unknown') {
					setAuthError(error.response.data.type);
				} else if (error.response.data.message)
					setAuthError(error.response.data.message);
			});
	};

	const logoutUser = async () => {
		axios({
			method: 'post',
			url: 'http://localhost:5000/auth/logout',
		})
			.then((result) => {
				if (result) {
					setCurrentUser({});
					setIsLoggedIn(false);
					sessionStorage.clear();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const registerUser = async (data) => {
		axios({
			method: 'post',
			url: 'http://localhost:5000/auth/register',
			data: data,
		})
			.then((result) => {
				if (result) {
					setCurrentUser(result.data.user);
					setIsLoggedIn(true);
					sessionStorage.setItem(
						'user',
						JSON.stringify(result.data.user)
					);
				}
			})
			.catch((error) => {
				if (error.response.data.type)
					setAuthError(error.response.data.type);
			});
	};

	return (
		<AuthContext.Provider
			value={{
				loginUser,
				logoutUser,
				registerUser,
				currentUser,
				setCurrentUser,
				isLoggedIn,
				authError,
				setAuthError,
				setIsUpdated,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
