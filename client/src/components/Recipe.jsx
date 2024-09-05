import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios';

const Recipe = ({ recipe }) => {
	const { isLoggedIn, currentUser, setCurrentUser } = useAuth();
	const [isSaved, setIsSaved] = useState();
	const recipeId = recipe._id;

	useEffect(() => {
		if (isLoggedIn && currentUser.savedRecipes) {
			const found = currentUser.savedRecipes.find(
				(recipeId) => recipeId === recipe._id
			);

			if (found) {
				setIsSaved(true);
			}
		}
	}, [currentUser]);

	const saveRecipe = () => {
		axios({
			method: 'post',
			url: 'http://localhost:5000/data/users/saveRecipe',
			data: {
				recipeId: recipe._id,
				userId: currentUser._id,
			},
		})
			.then((result) => {
				setCurrentUser(result.data);
				sessionStorage.setItem('user', JSON.stringify(result.data));
				console.log(result.data);
			})
			.catch((error) => {
				return console.log(error);
			});
	};

	const unsaveRecipe = async () => {
		axios({
			method: 'post',
			url: 'http://localhost:5000/data/users/unsaveRecipe',
			data: {
				recipeId: recipe._id,
				userId: currentUser._id,
			},
		})
			.then((result) => {
				setCurrentUser(result.data);
				sessionStorage.setItem('user', JSON.stringify(result.data));
				console.log(result.data);
			})
			.catch((error) => {
				return console.log(error);
			});
	};

	const handleSave = () => {
		setIsSaved(!isSaved);
		if (!isSaved) saveRecipe(recipe._id);
		else if (isSaved) unsaveRecipe(recipe._id);
	};

	return (
		<section
			className='m-2'
			style={{ width: '18rem' }}>
			<div className='card col-12'>
				<div className='card-body d-flex flex-row'>
					<div>
						<h5 className='card-title title font-weight-bold mb-2'>
							{recipe.recipeName}
						</h5>
						<p className='card-text text'>
							{dayjs(recipe.datePosted).format('DD/MM/YYYY')}
						</p>
						<p className='card-text '>{recipe.calory} Kalori</p>
					</div>
				</div>
				<div
					className='bg-image hover-overlay ripple rounded-0 text-center'
					data-mdb-ripple-color='light'>
					<img
						src={
							recipe.image
								? `http://localhost:5000/uploads/${recipe.image}`
								: `http://localhost:5000/uploads/placeholder-recipe.jpg`
						}
						alt='recipeImage'
						height={'200px'}
						width={'100%'}
						style={{ objectFit: 'cover', minHeight: '200px' }}
					/>
				</div>
				<div className='card-body'>
					<div className='d-flex justify-content-between'>
						<Link
							to={`/recipes/${recipeId}`}
							type='button'
							className='btn btn-orange p-md-1 my-1'
							state={recipeId}
							role='button'
							aria-expanded='false'
							aria-controls='collapseContent'>
							Daha Fazla Oku
						</Link>

						{isLoggedIn && (
							<div>
								<img
									src={
										isSaved
											? 'assets/star-yes.png'
											: 'assets/star-no.png'
									}
									alt='favorite'
									height='30px'
									onClick={handleSave}></img>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
export default Recipe;
