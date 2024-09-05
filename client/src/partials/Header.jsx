import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import Search from '../components/Search.jsx';

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const { isLoggedIn, currentUser, logoutUser } = useAuth();
	const navigate = useNavigate();

	window.addEventListener('scroll', () => {
		if (window.scrollY > 0) {
			setIsScrolled(true);
		} else {
			setIsScrolled(false);
		}
	});

	return (
		<header
			className={`header navbar navbar-expand-lg fixed-top shadow-0  ${
				isScrolled ? 'navbar-after-scroll ' : 'navbar-before-scroll'
			}`}>
			<div className='container-fluid '>
				<Link
					to='/'
					className='px-2'>
					<img
						className='brand'
						src='/assets/logo.png'
						alt='cookbook logo'
						height='40'></img>
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='.navbar-collapse'
					aria-controls='navbarsExample05'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<Link
								to='/recipes'
								className='nav-link px-2'>
								Tarifler
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								to='/categories'
								className='nav-link px-2'>
								Kategoriler
							</Link>
						</li>

						{isLoggedIn && (
							<li className='nav-item'>
								<Link
									to='/cookbook'
									className='nav-link px-2'>
									Yemek Kitabım
								</Link>
							</li>
						)}
						{isLoggedIn && currentUser.username === 'admin' && (
							<li className='nav-item'>
								<Link
									to='/panel'
									className='nav-link px-2'>
									Admin Paneli
								</Link>
							</li>
						)}
					</ul>

					{isLoggedIn ? (
						<li className='navbar-nav nav-item dropdown mx-2'>
							<Link
								className='nav-link dropdown-toggle'
								href='/'
								data-bs-toggle='dropdown'
								aria-expanded='false'>
								Ben
							</Link>
							<ul className='dropdown-menu'>
								<li>
									<Link
										className='dropdown-item'
										to='/profile'>
										Profil
									</Link>
								</li>
								<li>
									<Link
										className='dropdown-item'
										to='/myrecipes'>
										Tariflerim
									</Link>
								</li>
								<li>
									<Link
										className='dropdown-item'
										onClick={() => {
											logoutUser();
											navigate('/login');
										}}>
										Çıkış Yap
									</Link>
								</li>
							</ul>
						</li>
					) : (
						<div className='text-end'>
							<Link
								to='/login'
								type='button'
								className='btn btn-green me-2'>
								Giriş
							</Link>
							<Link
								to='/register'
								type='button'
								className='btn btn-orange me-2'>
								Kaydol
							</Link>
						</div>
					)}
					<Search />
				</div>
			</div>
		</header>
	);
};
export default Header;
