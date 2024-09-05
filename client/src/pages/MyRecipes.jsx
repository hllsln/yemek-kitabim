import Header from '../partials/Header.jsx';
import Footer from '../partials/Footer.jsx';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useData } from '../contexts/DataContext.jsx';
import Recipe from '../components/Recipe.jsx';

const MyRecipes = () => {
	const { currentUser } = useAuth();
	const { recipes, isLoading } = useData();

	return (
		<>
			<Header />
			<div className='mt-5 pt-5 px-4 d-flex justify-content-between'>
				<ol className='breadcrumb text justify-self-center'>
					<li className='breadcrumb-item'>
						<Link to='/'>Anasayfa</Link>
					</li>
					<li className='breadcrumb-item'>
						<Link to='/profile'>Profil</Link>
					</li>
					<li className='breadcrumb-item active'>Eklenen Tarifler</li>
				</ol>
				<Link to='/addrecipe'>
					<button className='btn btn-green p-2'>
						Yeni Tarif Ekle
					</button>
				</Link>
			</div>
			<div className='container main-container d-flex col-auto flex-wrap justify-content-center py-4'>
				{isLoading && <p>Yükleniyor...</p>}
				{recipes &&
					recipes.map((recipe) => {
						if (recipe.postedBy === currentUser._id) {
							return (
								<Recipe
									key={recipe._id}
									recipe={recipe}
								/>
							);
						}
					})}
			</div>
			<Footer />
		</>
	);
};
export default MyRecipes;
