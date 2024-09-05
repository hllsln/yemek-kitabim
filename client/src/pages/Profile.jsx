import Header from '../partials/Header.jsx';
import Footer from '../partials/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { useData } from '../contexts/DataContext.jsx';

const Profile = () => {
	const { isLoggedIn, currentUser, setCurrentUser } = useAuth();
	const navigate = useNavigate();
	const [isEditing, setIsEditing] = useState(false);
	const [updatedUser, setUpdatedUser] = useState({
		userId: currentUser._id,
		preferences: currentUser.preferences,
		minCalory: currentUser.minCalory,
		maxCalory: currentUser.maxCalory,
	});
	const [updateError, setUpdateError] = useState();
	const [isDone, setIsDone] = useState(false);
	const { isLoading, recipes, properties } = useData();
	const [file, setFile] = useState(null);

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/login');
		}
		console.log(currentUser);
	}, [isLoggedIn, navigate, currentUser]);

	useEffect(() => {
		console.log(updatedUser);
	}, [updatedUser]);

	const updateProfile = () => {
		console.log(updatedUser);
		const formData = new FormData();
		formData.append('image', file);
		formData.append('userData', JSON.stringify(updatedUser));
		axios({
			method: 'post',
			url: 'http://localhost:5000/data/users/update',
			data: formData,
		})
			.then((result) => {
				if (result) {
					console.log(result);
					setCurrentUser(result.data.user);
					sessionStorage.setItem(
						'user',
						JSON.stringify(result.data.user)
					);
					setIsDone(true);
					setUpdateError(false);
					setIsEditing(false);
				}
			})
			.catch((error) => {
				if (error.response.data) {
					setUpdateError(error.response.data.message);
				}

				setIsDone(false);
			});
	};

	return (
		<>
			{isLoggedIn ? (
				<>
					<Header />
					<div className='mt-5 pt-5 px-4'>
						<ol className='breadcrumb text'>
							<li className='breadcrumb-item'>
								<Link to={'/'}>Anasayfa</Link>
							</li>
							<li className='breadcrumb-item active'>Profil</li>
						</ol>
					</div>

					<div className='container main-container'>
						{updateError && (
							<p className='text-danger'>{updateError}</p>
						)}
						{isDone && (
							<p className='text-success'>
								Bilgiler başarıyla güncellendi.
							</p>
						)}
						<div className='main-body'>
							<div className='row gutters-sm'>
								<div className='col-md-4 mb-3'>
									<div className='card'>
										<div className='card-body'>
											<div className='d-flex flex-column align-items-center text-center'>
												{!isEditing ? (
													<img
														src={
															currentUser.avatar
																? `http://localhost:5000/uploads/${currentUser.avatar}`
																: `http://localhost:5000/uploads/placeholder-avatar.jpg`
														}
														alt='avatar'
														className='rounded-circle'
														width='150px'
														height='150px'
														style={{
															objectFit: 'cover',
														}}
													/>
												) : (
													<div className='col-12'>
														<input
															type='file'
															accept='.jpg, .jpeg, .png'
															name='image'
															onChange={(
																event
															) => {
																const selectedFile =
																	event.target
																		.files[0];
																setFile(
																	selectedFile
																);
															}}
														/>
														<img
															src={
																file
																	? URL.createObjectURL(
																			file
																	  )
																	: currentUser.avatar
																	? `http://localhost:5000/uploads/${currentUser.avatar}`
																	: `http://localhost:5000/uploads/placeholder-avatar.jpg`
															}
															alt=''
															height={'100px'}
															className='m-4'
														/>
													</div>
												)}
												<div className='mt-3'>
													{isEditing ? (
														<input
															className='text-area'
															placeholder={
																currentUser.username
															}
															name='username'
															onChange={(event) =>
																setUpdatedUser(
																	(
																		currentData
																	) => {
																		return {
																			...currentData,
																			[event
																				.target
																				.name]:
																				event
																					.target
																					.value,
																		};
																	}
																)
															}></input>
													) : (
														<h4>
															{
																currentUser.username
															}
														</h4>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='col-md-8'>
									<div className='card mb-3'>
										<div className='card-body'>
											<div className='row'>
												<div className='col-sm-3'>
													<h6 className='mb-0'>
														İsim
													</h6>
												</div>
												<div className='col-sm-9 text-secondary'>
													{isEditing ? (
														<input
															className='form-control'
															type='text'
															placeholder={
																currentUser.name
															}
															name='name'
															onChange={(event) =>
																setUpdatedUser(
																	(
																		currentData
																	) => {
																		return {
																			...currentData,
																			[event
																				.target
																				.name]:
																				event
																					.target
																					.value,
																		};
																	}
																)
															}
														/>
													) : (
														currentUser.name
													)}
												</div>
											</div>
											<hr />
											<div className='row'>
												<div className='col-sm-3'>
													<h6 className='mb-0'>
														E-mail
													</h6>
												</div>
												<div className='col-sm-9 text-secondary'>
													{isEditing ? (
														<input
															className='form-control'
															type='text'
															placeholder={
																currentUser.email
															}
															name='email'
															onChange={(event) =>
																setUpdatedUser(
																	(
																		currentData
																	) => {
																		return {
																			...currentData,
																			[event
																				.target
																				.name]:
																				event
																					.target
																					.value,
																		};
																	}
																)
															}
														/>
													) : (
														currentUser.email
													)}
												</div>
											</div>
											{isEditing && (
												<>
													<hr />
													<div className='row'>
														<div className='col-sm-3'>
															<h6 className='mb-0'>
																Şifre
															</h6>
														</div>
														<div className='col-sm-9 text-secondary'>
															<input
																className='form-control'
																type='password'
																placeholder='Yeni şifre'
																name='password'
																onChange={(
																	event
																) =>
																	setUpdatedUser(
																		(
																			currentData
																		) => {
																			return {
																				...currentData,
																				[event
																					.target
																					.name]:
																					event
																						.target
																						.value,
																			};
																		}
																	)
																}
															/>
														</div>
													</div>
												</>
											)}

											<hr />
											<div className='row'>
												<div className='col-sm-3'>
													<h6 className='mb-0'>
														Üyelik Tarihi
													</h6>
												</div>
												<div className='col-sm-9 text-secondary'>
													{dayjs(
														currentUser.membershipDate
													).format('DD/MM/YYYY')}
												</div>
											</div>

											<hr />
											<div className='row'>
												<div className='col-sm-6'>
													<div className='row'>
														<div className='col-sm-6'>
															<h6 className='mb-0'>
																Min Kalori
															</h6>
														</div>
														<div className='col-sm-6 text-secondary'>
															{isEditing ? (
																<input
																	className='form-control'
																	type='number'
																	placeholder={
																		updatedUser.minCalory +
																		' kcal'
																	}
																	name='minCalory'
																	onChange={(
																		event
																	) => {
																		const {
																			name,
																			value,
																		} =
																			event.target;

																		setUpdatedUser(
																			(
																				prev
																			) => {
																				return {
																					...prev,
																					[name]: value,
																				};
																			}
																		);
																	}}
																/>
															) : (
																updatedUser.minCalory +
																' kcal'
															)}
														</div>
													</div>
												</div>
												<div className='col-sm-6'>
													<div className='row col-sm-12'>
														<div className='col-sm-6'>
															<h6 className='mb-0'>
																Maks Kalori
															</h6>
														</div>
														<div className='col-sm-6 text-secondary'>
															{isEditing ? (
																<input
																	className='form-control'
																	type='number'
																	placeholder={
																		updatedUser.maxCalory +
																		' kcal'
																	}
																	name='maxCalory'
																	onChange={(
																		event
																	) => {
																		const {
																			name,
																			value,
																		} =
																			event.target;

																		setUpdatedUser(
																			(
																				prev
																			) => {
																				return {
																					...prev,
																					[name]: value,
																				};
																			}
																		);
																	}}
																/>
															) : (
																updatedUser.maxCalory +
																' kcal'
															)}
														</div>
													</div>
												</div>
											</div>

											<hr />
											<div className='row'>
												<div className='col-sm-3'>
													<h6 className='mb-0'>
														Beslenme Tercihleri
													</h6>
												</div>
												<div className='col-sm-9 text-secondary'>
													<ul className='list-unstyled'>
														{isEditing ? (
															<ul className='list-unstyled'>
																{properties &&
																	properties.map(
																		(
																			property
																		) => {
																			const found =
																				updatedUser.preferences.find(
																					(
																						propertyId
																					) =>
																						property._id ===
																						propertyId
																				);

																			return (
																				<li>
																					<input
																						type='checkbox'
																						name='_id'
																						value={
																							property._id
																						}
																						className='me-1'
																						checked={
																							found
																								? true
																								: false
																						}
																						onChange={(
																							event
																						) => {
																							const isChecked =
																								event
																									.target
																									.checked;

																							let updated =
																								updatedUser.preferences;

																							if (
																								isChecked
																							) {
																								updated.push(
																									property._id
																								);
																								setUpdatedUser(
																									(
																										prev
																									) => {
																										return {
																											...prev,
																											preferences:
																												updated,
																										};
																									}
																								);
																							} else {
																								updated =
																									updated.filter(
																										(
																											pref
																										) =>
																											property._id !==
																											pref
																									);
																								setUpdatedUser(
																									(
																										prev
																									) => {
																										return {
																											...prev,
																											preferences:
																												updated,
																										};
																									}
																								);
																							}
																						}}
																					/>
																					<label htmlFor='_id'>
																						{
																							property.propertyName
																						}
																					</label>
																				</li>
																			);
																		}
																	)}
															</ul>
														) : (
															updatedUser.preferences.map(
																(
																	propertyId
																) => {
																	const found =
																		properties.find(
																			(
																				property
																			) =>
																				property._id ===
																				propertyId
																		);
																	if (found) {
																		return (
																			<li>
																				{
																					found.propertyName
																				}
																			</li>
																		);
																	}
																}
															)
														)}
													</ul>
												</div>
											</div>
											<hr />

											<div className='row'>
												<div className='col-sm-12'>
													{isEditing ? (
														<button
															className='btn btn-orange '
															onClick={() => {
																updateProfile();
															}}>
															Kaydet
														</button>
													) : (
														<button
															className='btn btn-orange me-2 text'
															onClick={() =>
																setIsEditing(
																	true
																)
															}>
															Düzenle
														</button>
													)}
												</div>
											</div>
										</div>
									</div>

									<div className='row gutters-sm'>
										<div className='col-sm-6 mb-3'>
											<div className='card h-100'>
												<div className='card-body'>
													<h6 className='title d-flex align-items-center mb-3'>
														Eklenen Tarifler
													</h6>
													<div>
														{isLoading && (
															<p>Yükleniyor...</p>
														)}
														<ul className='list-unstyled'>
															{recipes &&
																recipes.map(
																	(
																		recipe
																	) => {
																		if (
																			recipe.postedBy ===
																			currentUser._id
																		) {
																			return (
																				<li className='text '>
																					<Link
																						to={`/recipes/${recipe._id}`}>
																						{
																							recipe.recipeName
																						}
																					</Link>
																				</li>
																			);
																		}
																	}
																)}
														</ul>
													</div>
												</div>
											</div>
										</div>
										<div className='col-sm-6 mb-3'>
											<div className='card h-100'>
												<div className='card-body'>
													<h6 className='title d-flex align-items-center mb-3'>
														Kaydedilen Tarifler
													</h6>
													<div>
														{isLoading && (
															<p>Yükleniyor...</p>
														)}
														<ul className='list-unstyled'>
															{currentUser.savedRecipes &&
																currentUser.savedRecipes.map(
																	(
																		recipeId
																	) => {
																		const recipeData =
																			recipes.find(
																				(
																					recipe
																				) =>
																					recipe._id ===
																					recipeId
																			);
																		if (
																			recipeData
																		) {
																			return (
																				<li className='text '>
																					<Link
																						to={`/recipes/${recipeData._id}`}>
																						{
																							recipeData.recipeName
																						}
																					</Link>
																				</li>
																			);
																		}
																	}
																)}
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<Footer />
				</>
			) : null}
		</>
	);
};
export default Profile;
