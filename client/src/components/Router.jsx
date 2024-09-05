import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Error from '../pages/Error.jsx';
import Recipes from '../pages/Recipes.jsx';
import Categories from '../pages/Categories.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Profile from '../pages/Profile.jsx';
import Cookbook from '../pages/Cookbook.jsx';
import RecipeDetails from '../pages/RecipeDetails.jsx';
import MyRecipes from '../pages/MyRecipes.jsx';
import AddRecipe from '../pages/AddRecipe.jsx';
import Panel from '../pages/Panel.jsx';
import RecoverPassword from '../pages/RecoverPassword.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
	},
	{
		path: '/recipes',
		element: <Recipes />,
	},
	{
		path: '/recipes/:recipeId',
		element: <RecipeDetails />,
	},
	{
		path: '/categories',
		element: <Categories />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/recoverpassword',
		element: <RecoverPassword />,
	},
	{
		path: '/profile',
		element: <Profile />,
	},
	{
		path: '/cookbook',
		element: <Cookbook />,
	},
	{
		path: '/addrecipe',
		element: <AddRecipe />,
	},
	{
		path: '/myrecipes',
		element: <MyRecipes />,
	},
	{
		path: '/panel',
		element: <Panel />,
	},
]);

export default router;
