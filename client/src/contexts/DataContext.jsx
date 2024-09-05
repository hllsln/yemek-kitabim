import React, { useState, useEffect, useContext, createContext } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [users, setUsers] = useState([]);
	const [recipes, setRecipes] = useState([]);
	const [properties, setProperties] = useState([]);
	const [categories, setCategories] = useState([]);
	const [comments, setComments] = useState([]);
	const { currentUser } = useAuth();
	const [isUpdated, setIsUpdated] = useState();

	useEffect(
		() => {
			const fetchRecipes = async () => {
				await fetch('http://localhost:5000/data/recipes')
					.then((response) => response.json())
					.then((data) => setRecipes(data))
					.catch((err) => {
						setError(err);
						console.log(err);
					})
					.finally(() => setIsLoading(false));
			};

			const fetchUsers = async () => {
				await fetch('http://localhost:5000/data/users')
					.then((response) => response.json())
					.then((data) => setUsers(data))
					.catch((err) => {
						setError(err);
						console.log(err);
					})
					.finally(setIsLoading(false));
			};

			const fetchProperties = async () => {
				await fetch('http://localhost:5000/data/properties')
					.then((response) => response.json())
					.then((data) => setProperties(data))
					.catch((err) => {
						setError(err);
						console.log(err);
					})
					.finally(setIsLoading(false));
			};

			const fetchCategories = async () => {
				await fetch('http://localhost:5000/data/categories')
					.then((response) => response.json())
					.then((data) => setCategories(data))
					.catch((err) => {
						setError(err);
						console.log(err);
					})
					.finally(setIsLoading(false));
			};

			const fetchComments = async () => {
				await fetch('http://localhost:5000/data/comments')
					.then((response) => response.json())
					.then((data) => {
						setComments(data);
					})
					.catch((err) => {
						setError(err);
						console.log(err);
					})
					.finally(setIsLoading(false));
			};

			fetchRecipes();
			fetchUsers();
			fetchProperties();
			fetchCategories();
			fetchComments();
		},
		[currentUser],
		[isUpdated]
	);

	return (
		<DataContext.Provider
			value={{
				isLoading,
				error,
				recipes,
				setRecipes,
				users,
				setUsers,
				properties,
				categories,
				setIsUpdated,
				comments,
				setComments,
			}}>
			{children}
		</DataContext.Provider>
	);
};
