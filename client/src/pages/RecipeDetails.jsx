import Header from '../partials/Header.jsx';
import Footer from '../partials/Footer.jsx';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import CommentSection from '../components/CommentSection.jsx';

const RecipeDetails = () => {
	const { isLoading, recipes, categories, properties, setRecipes, users } =
		useData();
	const { recipeId } = useParams();
	const [recipe, setRecipe] = useState();
	const [isEditing, setIsEditing] = useState(false);
	const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
	const [ingredient, setIngredient] = useState();
	const [file, setFile] = useState(null);
	const navigate = useNavigate();
	const { currentUser } = useAuth();
	const [author, setAuthor] = useState();

	useEffect(() => {
		const currentRecipe = recipes.find((recipe) => recipe._id === recipeId);
		setRecipe(currentRecipe);
		setUpdatedRecipe(currentRecipe);
	}, [recipes]);

	useEffect(() => {
		if (recipe) {
			const foundUser = users.find((usr) => usr._id === recipe.postedBy);
			setAuthor(foundUser);
			console.log(foundUser);
		}
	}, [recipe]);

	const updateRecipe = (event) => {
		const { name, value } = event.target;

		if (name === 'ingredients' || name === 'properties') {
			setUpdatedRecipe((prev) => {
				return {
					...prev,
					[name]: [...prev[name], value],
				};
			});
		} else {
			setUpdatedRecipe((prev) => {
				return {
					...prev,
					[name]: value,
				};
			});
		}
	};

	const saveRecipe = () => {
		const formData = new FormData();
		formData.append('image', file);
		formData.append('recipeData', JSON.stringify(updatedRecipe));
		axios({
			method: 'post',
			url: 'http://localhost:5000/data/recipes/update',
			data: formData,
		})
			.then((result) => {
				console.log(result);
				if (result.data.modifiedCount === 1) {
					const updated = result.data.updatedData;

					const modifiedRecipes = recipes.filter(
						(recipe) => recipe._id !== updated._id
					);
					modifiedRecipes.push(updated);
					setRecipes(modifiedRecipes);

					setIsEditing(false);
				}
			})
			.catch((error) => console.log(error));
	};

	const deleteRecipe = () => {
		axios({
			method: 'delete',
			url: 'http://localhost:5000/data/recipes/delete',
			data: {
				recipeId: recipeId,
			},
		})
			.then((result) => {
				const deleted = result.data;

				const modifiedRecipes = recipes.filter(
					(recipe) => recipe._id !== deleted._id
				);

				setRecipes(modifiedRecipes);

				setIsEditing(false);
			})
			.catch((error) => console.log(error));
	};

	return (
		<>
			<Header />
			<div className='mt-5 pt-5 px-4'>
				<ol className='breadcrumb text'>
					<li className='breadcrumb-item'>
						<Link to={'/'}>Anasayfa</Link>
					</li>
					<li className='breadcrumb-item'>
						<Link to={'/recipes'}>Tarifler</Link>
					</li>
					<li className='breadcrumb-item active'>
						{recipe && recipe.recipeName}
					</li>
				</ol>
			</div>
			<div className='container main-container d-flex  flex-wrap justify-content-center py-4'>
				{isLoading && <p>Yükleniyor...</p>}
				{recipe && (
					<div
						className='card shadow mb-4'
						style={{ width: ' 75%' }}>
						<div className='card-body p-5'>
							<div className='d-flex justify-content-between'>
								<p className='text mb-4'>
									{dayjs(recipe.datePosted).format(
										'DD/MM/YYYY'
									)}
								</p>
								<div className='be-img-comment d-flex justify-content-center align-items-start'>
									<p className='me-2 align-self-center'>
										{author ? author.username : 'Admin'}
									</p>
									<img
										src={
											author && author.avatar
												? `http://localhost:5000/uploads/${author.avatar}`
												: `http://localhost:5000/uploads/placeholder-avatar.jpg`
										}
										alt=''
										className='be-ava-small'></img>
								</div>
							</div>
							<div className='mt-4 d-flex justify-content-between'>
								<h4 className='title col-6'>
									{isEditing ? (
										<input
											type='text'
											name='recipeName'
											value={updatedRecipe.recipeName}
											placeholder={
												updatedRecipe.recipeName
											}
											onChange={(event) =>
												updateRecipe(event)
											}></input>
									) : (
										recipe.recipeName
									)}{' '}
									Tarifi
								</h4>
								{isEditing ? (
									<div>
										<button
											className='btn btn-green'
											onClick={() => setIsEditing(false)}>
											İptal
										</button>
										<button
											className='btn btn-orange ms-2'
											onClick={saveRecipe}>
											Kaydet
										</button>
										<button
											className='btn btn-danger ms-2'
											onClick={() => {
												console.log(recipeId);
												deleteRecipe();
												navigate('/myrecipes');
											}}>
											Sil
										</button>
									</div>
								) : (
									(currentUser._id === recipe.postedBy ||
										currentUser.username === 'admin') && (
										<button
											className='btn btn-orange ms-2'
											onClick={() => setIsEditing(true)}>
											Düzenle
										</button>
									)
								)}
							</div>

							<div>
								{isEditing ? (
									<div>
										<input
											type='file'
											accept='.jpg, .jpeg, .png'
											name='image'
											onChange={(event) => {
												const selectedFile =
													event.target.files[0];
												setFile(selectedFile);
											}}
										/>
										<img
											src={
												file
													? URL.createObjectURL(file)
													: `http://localhost:5000/uploads/${updatedRecipe.image}`
											}
											alt=''
											height={'100px'}
											className='m-4'
										/>
									</div>
								) : (
									<img
										className='img-fluid  rounded mb-5 '
										style={{
											maxWidth: ' 75%',
											objectFit: 'contain',
										}}
										src={
											recipe.image
												? `http://localhost:5000/uploads/${updatedRecipe.image}`
												: `http://localhost:5000/uploads/placeholder-recipe.jpg	`
										}
										alt='Recipe name'
									/>
								)}
							</div>
							<hr />
							<div className='my-4'>
								<h4 className='title mb-3'>Kategori</h4>
								{isEditing ? (
									<select
										name='category'
										id=''
										className='col-10 py-1'
										onClick={(event) =>
											updateRecipe(event)
										}>
										{categories.map((category) => {
											if (
												recipe.category === category._id
											) {
												return (
													<option
														key={category._id}
														name={category}
														value={category._id}
														selected>
														{category.categoryName}
													</option>
												);
											} else {
												return (
													<option
														key={category._id}
														name={category}
														value={category._id}>
														{category.categoryName}
													</option>
												);
											}
										})}
									</select>
								) : (
									<p className='text'>
										{categories.map((category) => {
											if (
												category._id === recipe.category
											) {
												return category.categoryName;
											}
										})}
									</p>
								)}
							</div>
							<hr />
							<div className='my-5'>
								<h4 className='title mb-3'>Özellikler</h4>
								<ul className='text p-0'>
									{!isEditing &&
										properties.map((property) => {
											return recipe.properties.map(
												(propId) => {
													if (
														property._id === propId
													) {
														return (
															<li className='mb-2 ms-4'>
																{
																	property.propertyName
																}
															</li>
														);
													}
												}
											);
										})}
									{isEditing && (
										<div className=' text-secondary d-flex flex-wrap '>
											{properties.map((property) => {
												const isChecked =
													updatedRecipe.properties.find(
														(propId) =>
															propId ===
															property._id
													);

												return (
													<div
														className='col-sm-5 d-flex flex-row align-content-start'
														key={property._id}>
														<input
															type='checkbox'
															className='my-1 me-1'
															name='properties'
															checked={isChecked}
															value={property._id}
															onChange={(
																event
															) => {
																if (
																	event.target
																		.checked
																) {
																	updateRecipe(
																		event
																	);
																} else {
																	setUpdatedRecipe(
																		(
																			prev
																		) => {
																			return {
																				...prev,
																				properties:
																					prev.properties.filter(
																						(
																							prop
																						) =>
																							prop !==
																							property._id
																					),
																			};
																		}
																	);
																}
															}}
														/>
														<label htmlFor='properties'>
															{
																property.propertyName
															}
														</label>
													</div>
												);
											})}
										</div>
									)}
								</ul>
							</div>
							<hr />
							<div className='my-4'>
								<h5 className='title mb-3'>
									Kalori (Porsiyon)
								</h5>
								{isEditing ? (
									<input
										type='number'
										name='calory'
										value={updatedRecipe.calory}
										placeholder={recipe.calory}
										onChange={(event) =>
											updateRecipe(event)
										}
									/>
								) : (
									<p className='text'>{recipe.calory} kcal</p>
								)}
							</div>
							<hr />
							<div className='my-5'>
								<h5 className='title mb-3'>Malzemeler</h5>
								{isEditing && (
									<div className='col-sm-12'>
										<input
											type='text'
											className='col-sm-10 text-area text-secondary'
											placeholder='Malzeme ekle'
											value={ingredient}
											onChange={(event) => {
												setIngredient(
													event.target.value
												);
											}}
										/>
										<button
											className='btn btn-orange col-sm-1 ms-2 px-1'
											style={{ fontSize: '1rem' }}
											name='ingredients'
											value={ingredient}
											onClick={(event) => {
												updateRecipe(event);
												setIngredient('');
											}}>
											+
										</button>
									</div>
								)}
								<ul className='text mb-5 p-0'>
									{isEditing &&
										updatedRecipe.ingredients.map(
											(ingredient, index) => {
												return (
													<div className='d-flex justify-content-start'>
														<input
															type='text'
															name='ingredients'
															className='col-10 my-1'
															placeholder={
																ingredient
															}
															onChange={(
																event
															) => {
																const {
																	value,
																} =
																	event.target;
																let modifiedRecipe =
																	updatedRecipe;
																modifiedRecipe.ingredients[
																	index
																] = value;
																setUpdatedRecipe(
																	modifiedRecipe
																);
															}}
														/>
														<button
															style={{
																background:
																	'transparent',
																border: 'none',
															}}
															onClick={(
																event
															) => {
																setUpdatedRecipe(
																	(prev) => {
																		return {
																			...prev,
																			ingredients:
																				prev.ingredients.filter(
																					(
																						prevIngredient
																					) =>
																						prevIngredient !==
																						ingredient
																				),
																		};
																	}
																);
															}}>
															<img
																src='assets/delete.png'
																height='20px'
																alt=''
															/>
														</button>
													</div>
												);
											}
										)}
									{!isEditing &&
										recipe.ingredients.map(
											(ingredient, index) => {
												return (
													<li
														className='mb-2 ms-4'
														key={index}>
														{ingredient}
													</li>
												);
											}
										)}
								</ul>
							</div>
							<hr />
							<div className='my-2'>
								<h5 className='mt-5 mb-3 title'>Yapılışı</h5>
								<div className='row'>
									{isEditing ? (
										<textarea
											type='text'
											name='instructions'
											rows={10}
											value={updatedRecipe.instructions}
											placeholder={
												updatedRecipe.instructions
											}
											className='text-area col-sm-12 text-secondary'
											onChange={(event) =>
												updateRecipe(event)
											}></textarea>
									) : (
										<p className='text'>
											{recipe.instructions}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
				<CommentSection recipeId={recipeId} />
			</div>

			<Footer />
		</>
	);
};
export default RecipeDetails;
