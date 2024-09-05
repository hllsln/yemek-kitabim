import Header from '../partials/Header.jsx';
import Footer from '../partials/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios';

const AddRecipe = () => {
	const [file, setFile] = useState(null);
	const { properties, categories, setRecipes } = useData();
	const { currentUser, setCurrentUser } = useAuth();
	const [ingredient, setIngredient] = useState('');
	const [newRecipe, setNewRecipe] = useState({
		recipeName: '',
		category: '',
		calory: '',
		ingredients: [],
		instructions: '',
		properties: [],
		image: '',
		postedBy: currentUser._id,
	});
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		setNewRecipe((prev) => {
			return {
				...prev,
				postedBy: currentUser._id,
			};
		});
	}, [currentUser]);

	useEffect(() => console.log(newRecipe), [newRecipe]);

	const updateNewRecipe = (event) => {
		const { name, value } = event.target;

		if (name === 'ingredients' || name === 'properties') {
			setNewRecipe((prev) => {
				return {
					...prev,
					[name]: [...prev[name], value],
				};
			});
		} else {
			setNewRecipe((prev) => {
				return {
					...prev,
					[name]: value,
				};
			});
		}
	};

	const handleSubmit = () => {
		if (!file) {
			setError('Lütfen bir resim seçiniz.');
		} else {
			postRecipe();
		}
	};

	const postRecipe = () => {
		const formData = new FormData();
		formData.append('image', file);
		formData.append('recipeData', JSON.stringify(newRecipe));
		axios({
			method: 'post',
			url: 'http://localhost:5000/data/recipes/post',
			data: formData,
		})
			.then((result) => {
				if (result.data.errors) {
					setError('Lütfen tüm alanları doldurunuz.');
					console.log(result.data.errors);
				} else {
					console.log(result);
					setError('');
					const addedRecipe = result.data;
					const updatedUser = currentUser;
					updatedUser.postedRecipes.push(addedRecipe._id);
					setCurrentUser(updatedUser);
					setRecipes((prev) => {
						return [...prev, addedRecipe];
					});
					sessionStorage.setItem('user', JSON.stringify(updatedUser));
					navigate(`/recipes/${addedRecipe._id}`);
				}
			})
			.catch((error) => {
				setError(
					'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
				);
				console.log(error);
			});
	};

	return (
		<>
			<Header />
			<div className='mt-5 pt-5 px-4'>
				<ol className='breadcrumb text justify-self-center'>
					<li className='breadcrumb-item'>
						<Link to='/'>Anasayfa</Link>
					</li>
					<li className='breadcrumb-item'>
						<Link to='/profile'>Profil</Link>
					</li>
					<li className='breadcrumb-item'>
						<Link to='/myrecipes'>Eklenen Tarifler</Link>
					</li>
					<li className='breadcrumb-item active'>Tarif Ekle</li>
				</ol>
			</div>
			<div className='main-container d-flex flex-column align-items-center'>
				<h3 className='title mb-4'>Yeni Tarif Bilgileri</h3>
				<div className='col-md-8'>
					<div className='card mb-3'>
						<div className='card-body'>
							<div className='row'>
								<div className='col-sm-4 '>
									<h6 className='mb-0 text'>Tarif Adı</h6>
								</div>

								<input
									type='text'
									name='recipeName'
									className='text-area col-sm-7 text-secondary'
									onChange={(event) => updateNewRecipe(event)}
								/>
							</div>
							<hr />
							<div className='row'>
								<div className='col-sm-4 '>
									<h6 className='mb-0 text'>Kategori</h6>
								</div>
								<select
									name='category'
									className='text-area col-sm-7 text-secondary py-1'
									onChange={(event) => {
										updateNewRecipe(event);
									}}>
									<option
										value=''
										disabled
										selected>
										Kategori seçiniz
									</option>
									{categories.map((category) => (
										<option
											key={category._id}
											id={category._id}
											name='category'
											value={category._id}>
											{category.categoryName}
										</option>
									))}
								</select>
							</div>
							<hr />
							<div className='row'>
								<div className='col-sm-4'>
									<h6 className='mb-0 text'>
										Kalori (porsiyon)
									</h6>
								</div>
								<input
									type='text'
									name='calory'
									className='text-area col-sm-7 text-secondary'
									placeholder='131 kcal'
									onChange={(event) => updateNewRecipe(event)}
								/>
							</div>

							<hr />
							<div className='row'>
								<div className='col-sm-4'>
									<h6 className='mb-0 text'>Malzemeler</h6>
								</div>
								<div className='col-sm-8 p-0'>
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
												updateNewRecipe(event);
												setIngredient('');
											}}>
											+
										</button>
									</div>

									<ul
										className='mt-2 p-0'
										style={{ listStyleType: 'none' }}>
										{newRecipe.ingredients &&
											newRecipe.ingredients.map(
												(newIngredient, index) => (
													<div
														key={index}
														className='d-flex col-sm-10 justify-content-between'>
														<li className='col-sm-11 my-1'>
															{newIngredient}
														</li>
														<button
															style={{
																background:
																	'transparent',
																border: 'none',
															}}
															onClick={(
																event
															) => {
																setNewRecipe(
																	(prev) => {
																		return {
																			...prev,
																			ingredients:
																				prev.ingredients.filter(
																					(
																						ingredientName
																					) =>
																						ingredientName !==
																						newIngredient
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
												)
											)}
									</ul>
								</div>
							</div>
							<hr />
							<div className='row'>
								<div className='col-sm-4'>
									<h6 className='mb-0 text'>Yapılışı</h6>
								</div>
								<textarea
									type='text'
									name='instructions'
									rows={10}
									className='text-area col-sm-7 text-secondary'
									onChange={(event) =>
										updateNewRecipe(event)
									}></textarea>
							</div>
							<hr />
							<div className='row'>
								<div className='col-sm-4'>
									<h6 className='mb-0 text'>Özellikler</h6>
								</div>
								<div className='text-area col-sm-7 text-secondary d-flex flex-wrap'>
									{properties.map((property) => (
										<div
											className='col-sm-5'
											key={property._id}>
											<input
												type='checkbox'
												id={property._id}
												name='properties'
												value={property._id}
												style={{ width: '30px' }}
												onChange={(event) => {
													if (event.target.checked) {
														updateNewRecipe(event);
													} else {
														setNewRecipe((prev) => {
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
														});
													}
												}}
											/>
											<label
												htmlFor={property.propertyName}
												className='text'>
												{property.propertyName}
											</label>
										</div>
									))}
								</div>
							</div>
							<hr />
							<div className='row'>
								<div className='col-sm-4 '>
									<h6 className='mb-0 text'>Tarif Resmi</h6>
								</div>
								<div className='col-sm-8'>
									<p className='m-0'>
										Tarifinizin bir resmini ekleyin.
									</p>
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
												: ''
										}
										alt=''
										height={'100px'}
										className='m-4'
									/>
								</div>
							</div>
							<hr />
							<div className='d-flex justify-content-end me-2'>
								{error && (
									<p className='text-danger mb-0 me-3 align-self-center'>
										{error}
									</p>
								)}
								<button
									className='btn btn-orange text'
									onClick={handleSubmit}>
									Ekle
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};
export default AddRecipe;
