import Header from '../partials/Header.jsx';
import Footer from '../partials/Footer.jsx';
import Recipe from '../components/Recipe.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useEffect } from 'react';

const Cookbook = () => {
	const { isLoading, recipes } = useData();
	const { isLoggedIn, currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/login');
		}
	});

	return (
		<>
			<Header />
			<div className='mt-5 pt-5 px-4'>
				<ol className='breadcrumb text'>
					<li className='breadcrumb-item'>
						<Link to={'/'}>Anasayfa</Link>
					</li>
					<li className='breadcrumb-item active'>Yemek Kitabım</li>
				</ol>
			</div>
			<div className='container main-container d-flex col-auto flex-wrap justify-content-center py-4'>
				{isLoading && <p>Yükleniyor...</p>}
				{currentUser.savedRecipes &&
					currentUser.savedRecipes.map((recipeId) => {
						const recipeData = recipes.find(
							(recipe) => recipe._id === recipeId
						);
						if (recipeData) {
							return (
								<Recipe
									key={recipeData._id}
									recipe={recipeData}
								/>
							);
						}
					})}
			</div>
			<Footer />
		</>
	);
};
export default Cookbook;
