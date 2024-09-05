import Header from '../partials/Header.jsx';
import Footer from '../partials/Footer.jsx';
import React, { useEffect, useState } from 'react';
import Divider from '../components/Divider.jsx';
import Info from '../components/Info.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useData } from '../contexts/DataContext.jsx';
import Recipe from '../components/Recipe.jsx';
import { Link } from 'react-router-dom';
import CommentSection from '../components/CommentSection.jsx';

const Home = () => {
	const { isLoggedIn, currentUser } = useAuth();
	const { recipes, categories } = useData();
	const [topRecipes, setTopRecipes] = useState([]);
	const [categoryIds, setCategoryIds] = useState({});
	const [menu, setMenu] = useState();

	useEffect(
		() => {
			categories.forEach((category) => {
				setCategoryIds((prev) => {
					return {
						...prev,
						[category.categoryName]: category._id,
					};
				});
			});
			console.log(categoryIds);
		},
		[categories],
		[]
	);

	useEffect(() => {
		const minCalory = currentUser.minCalory;
		const maxCalory = currentUser.maxCalory;

		const kahvaltilar = recipes.filter(
			(recipe) => recipe.category === categoryIds['Kahvaltı']
		);

		const corbalar = recipes.filter(
			(recipe) => recipe.category === categoryIds['Çorba']
		);
		const salatalar = recipes.filter(
			(recipe) => recipe.category === categoryIds['Salata']
		);
		const mezeler = recipes.filter(
			(recipe) => recipe.category === categoryIds['Meze']
		);
		const anayemekler = recipes.filter(
			(recipe) => recipe.category === categoryIds['Ana Yemek']
		);

		console.log(kahvaltilar, anayemekler, corbalar, salatalar, mezeler);

		const createBreakfast = () => {
			if (kahvaltilar.length !== 0) {
				const kahvaltiNo = Math.floor(
					Math.random() * kahvaltilar.length
				);

				const kahvalti = kahvaltilar[kahvaltiNo];
				setMenu((prev) => {
					return { ...prev, breakfast: { kahvalti } };
				});
			}
		};

		const createLunch = () => {
			if (anayemekler.length !== 0) {
				const anayemekNo = Math.floor(
					Math.random() * anayemekler.length
				);
				const corbaNo = Math.floor(Math.random() * corbalar.length);
				const salataNo = Math.floor(Math.random() * salatalar.length);

				const anayemek = anayemekler[anayemekNo];
				const corba = corbalar[corbaNo];
				const salata = salatalar[salataNo];

				setMenu((prev) => {
					return {
						...prev,
						lunch: { anayemek, corba, salata },
					};
				});
			}
		};

		const createDinner = () => {
			if (anayemekler.length !== 0) {
				const anayemekNo = Math.floor(
					Math.random() * anayemekler.length
				);
				const corbaNo = Math.floor(Math.random() * corbalar.length);
				const salataNo = Math.floor(Math.random() * salatalar.length);
				const mezeNo = Math.floor(Math.random() * mezeler.length);

				const anayemek = anayemekler[anayemekNo];
				const corba = corbalar[corbaNo];
				const salata = salatalar[salataNo];
				const meze = mezeler[mezeNo];
				setMenu((prev) => {
					return {
						...prev,
						dinner: { anayemek, corba, salata, meze },
					};
				});
			}
		};

		if (categoryIds) {
			createBreakfast();
			createLunch();
			createDinner();
		}
	}, [categoryIds]);

	useEffect(() => {
		const sortRecipesBySaveCount = () => {
			const sortedRecipes = [...recipes];
			sortedRecipes.sort((a, b) => b.saveCount - a.saveCount);
			setTopRecipes(sortedRecipes.slice(0, 8));
		};

		sortRecipesBySaveCount();
	}, [recipes]);

	return (
		<>
			<Header />
			{!isLoggedIn && (
				<>
					<div className='header-img mb-5'>
						<div className='container col-xxl-9 px-4 py-5 text-white'>
							<div className='row flex-lg-row-reverse align-items-center g-5 py-5'>
								<div className='col-10 col-sm-8 col-lg-6'></div>
								<div className='col-lg-6'>
									<h1 className='header-title display-5 fw-bold lh-1 my-5'>
										Yaşam Tarzınıza Uygun Tarifler
									</h1>
									<p className='header-text my-5'>
										Bugün ne pişirsem sorusuna en güzel
										cevap, günlük menünüzde sizi bekliyor.
									</p>
									<div className='d-grid gap-2 d-md-flex justify-content-md-start'>
										<Link
											type='button'
											to='/register'
											className='btn btn-orange btn-lg px-4 me-md-2'>
											Başla
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>

					<Divider />

					<div className='container d-flex col-auto flex-wrap justify-content-center py-4'>
						<Info
							title={'Yemek Kitabınızı Oluşturun'}
							text={
								'Favori tariflerinizi size özel yemek kitabınıza kaydedin ve asla kaybetmeyin.'
							}
							imageUrl={'assets/cookbook.jpg'}
						/>

						<Info
							title={'Kendi Tariflerinizi Paylaşın'}
							text={
								'Harika bir tarif mi keşfettiniz? Hemen yükleyin ve herkesle paylaşın.'
							}
							imageUrl={'assets/cooking.jpg'}
						/>
						<Info
							title={'Size Özel Menünüz'}
							text={
								'Beslenme kriterlerinizi söyleyin ve sizin tercihlerinize uygun günlük menünüzü biz	hazırlayalım.'
							}
							imageUrl={'assets/emptydish.jpg'}
						/>
					</div>
				</>
			)}
			<div className='container main-container mt-5'>
				{isLoggedIn && (
					<div>
						<h1 className='title text-center'>Günlük Menünüz</h1>

						<div className='container d-flex col-auto flex-wrap justify-content-start py-4 ms-4'>
							<h1 className='title col-11 ms-2'>Kahvaltı</h1>
							<div className='d-flex flex-row mb-5'>
								{menu && (
									<Recipe
										key={menu.breakfast.kahvalti._id}
										recipe={menu.breakfast.kahvalti}
									/>
								)}
							</div>
							<h1 className='title col-11 ms-2'>Öğle Yemeği</h1>
							<div className='d-flex flex-row mb-5'>
								{menu && (
									<Recipe
										key={menu.lunch.anayemek._id}
										recipe={menu.lunch.anayemek}
									/>
								)}
								{menu && (
									<Recipe
										key={menu.lunch.corba._id}
										recipe={menu.lunch.corba}
									/>
								)}
								{menu && (
									<Recipe
										key={menu.lunch.salata._id}
										recipe={menu.lunch.salata}
									/>
								)}
							</div>
							<h1 className='title col-11 ms-2'>Akşam Yemeği</h1>
							<div className='d-flex flex-row mb-5'>
								{menu && (
									<Recipe
										key={menu.dinner.anayemek._id}
										recipe={menu.dinner.anayemek}
									/>
								)}
								{menu && (
									<Recipe
										key={menu.dinner.corba._id}
										recipe={menu.dinner.corba}
									/>
								)}
								{menu && (
									<Recipe
										key={menu.dinner.salata._id}
										recipe={menu.dinner.salata}
									/>
								)}
								{menu && (
									<Recipe
										key={menu.dinner.meze._id}
										recipe={menu.dinner.meze}
									/>
								)}
							</div>
						</div>
					</div>
				)}
				<h1 className='title text-center'>En Beğenilen Tarifler</h1>
				<div className='container main-container d-flex col-auto flex-wrap justify-content-center py-4'>
					{topRecipes &&
						topRecipes.map((recipe) => {
							return (
								<Recipe
									key={recipe._id}
									recipe={recipe}
								/>
							);
						})}
				</div>
			</div>
			)
			<Footer />
		</>
	);
};
export default Home;
