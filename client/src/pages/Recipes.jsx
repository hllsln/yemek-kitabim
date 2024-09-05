import Header from '../partials/Header.jsx';
import Footer from '../partials/Footer.jsx';
import Recipe from '../components/Recipe.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext.jsx';
import { useEffect, useState } from 'react';

const Recipes = () => {
	const { isLoading, recipes, categories, properties } = useData();
	const [filters, setFilters] = useState({
		nameFilter: '',
		categoryFilter: [],
		propertyFilter: [],
	});
	const [shownRecipes, setShownRecipes] = useState();
	const { state, pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (state && state.recipeName) {
			setFilters((prev) => {
				return {
					...prev,
					nameFilter: state.recipeName,
				};
			});
		}
	}, [state]);

	useEffect(() => {
		if (recipes) {
			setShownRecipes(recipes);
		}

		navigate(pathname, { replace: true });
	}, [recipes]);

	useEffect(() => {}, [state]);

	useEffect(() => {
		const applyFilters = () => {
			if (recipes) {
				let filteredRecipes = recipes;

				if (filters.nameFilter.length > 0) {
					filteredRecipes = filteredRecipes.filter(
						(recipe) =>
							recipe.recipeName
								.toLowerCase()
								.indexOf(filters.nameFilter.toLowerCase()) !==
							-1
					);
				}

				if (filters.categoryFilter.length > 0) {
					filteredRecipes = filteredRecipes.filter((recipe) =>
						filters.categoryFilter.includes(recipe.category)
					);
				}

				if (filters.propertyFilter.length > 0) {
					filteredRecipes = filteredRecipes.filter((recipe) =>
						filters.propertyFilter.every((property) =>
							recipe.properties.includes(property)
						)
					);
				}

				setShownRecipes(filteredRecipes);
				console.log(filteredRecipes);
			}
		};

		applyFilters();
		console.log(filters);
	}, [filters]);

	const handleChange = (event) => {
		const { id, value, checked } = event.target;

		if (id === 'category') {
			let categoryFilters = filters.categoryFilter;

			if (checked) {
				categoryFilters.push(value);
			} else if (!checked) {
				categoryFilters = categoryFilters.filter(
					(ctgId) => ctgId !== value
				);
			} else {
				return;
			}
			console.log(categoryFilters);
			setFilters((prev) => {
				return {
					...prev,
					categoryFilter: categoryFilters,
				};
			});
		}
		if (id === 'property') {
			let propertyFilters = filters.propertyFilter;
			if (checked) {
				propertyFilters.push(value);
			} else if (!checked) {
				propertyFilters = propertyFilters.filter(
					(prpId) => prpId !== value
				);
			} else {
				return;
			}
			console.log(propertyFilters);
			setFilters((prev) => {
				return {
					...prev,
					propertyFilter: propertyFilters,
				};
			});
		}
	};

	return (
		<>
			<Header />
			<div className='mt-5 pt-5 px-4 d-flex justify-content-between'>
				<div>
					<ol className='breadcrumb text'>
						<li className='breadcrumb-item'>
							<Link to={'/'}>Anasayfa</Link>
						</li>
						<li className='breadcrumb-item active'>Tarifler</li>
					</ol>
				</div>
				<div className='dropdown'>
					<button
						className='btn btn-green dropdown-toggle'
						type='button'
						data-bs-toggle='dropdown'
						aria-expanded='false'>
						Filtreler
					</button>
					<ul
						className='dropdown-menu '
						style={{ whiteSpace: 'nowrap' }}>
						<div className='d-flex flex-column align-items-center'>
							<div className='d-flex'>
								<li className='form-check m-3 '>
									<h6>Kategori</h6>
									{categories &&
										categories.map((ctg) => {
											return (
												<div>
													<input
														class='form-check-input'
														type='checkbox'
														value={ctg._id}
														id='category'
														onChange={(event) =>
															handleChange(event)
														}
													/>
													<label
														class='form-check-label'
														for='category'>
														{ctg.categoryName}
													</label>
												</div>
											);
										})}
								</li>
								<li className='form-check m-3'>
									<h6>Özellikler</h6>
									{properties &&
										properties.map((prp) => (
											<div>
												<input
													class='form-check-input'
													type='checkbox'
													value={prp._id}
													id='property'
													onChange={(event) =>
														handleChange(event)
													}
												/>
												<label
													class='form-check-label'
													for='property'>
													{prp.propertyName}
												</label>
											</div>
										))}
								</li>
							</div>
							<button
								className='btn btn-sm btn-orange'
								onClick={() =>
									setFilters({
										nameFilter: '',
										categoryFilter: [],
										propertyFilter: [],
									})
								}>
								Filtreleri Temizle
							</button>
						</div>
					</ul>
				</div>
			</div>
			<div className='container main-container d-flex col-auto flex-wrap justify-content-center py-4'>
				{isLoading && <p>Yükleniyor...</p>}
				{shownRecipes &&
					shownRecipes.map((recipe) => {
						return (
							<Recipe
								key={recipe._id}
								recipe={recipe}
							/>
						);
					})}
			</div>
			<Footer />
		</>
	);
};
export default Recipes;
