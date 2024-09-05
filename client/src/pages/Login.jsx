import Header from '../partials/Header.jsx';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

const Login = () => {
	const navigate = useNavigate();
	const { loginUser, isLoggedIn, authError, setAuthError } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/profile');
		}
	});

	const handleChange = (event) => {
		const { id, value } = event.target;

		if (id === 'email') {
			setEmail(value);
		}

		if (id === 'password') {
			setPassword(value);
		}

		setAuthError(null);
	};

	return (
		<>
			{isLoggedIn ? null : (
				<>
					<Header />
					<div className='d-lg-flex half'>
						<div className='bg order-1 order-md-2'></div>
						<div className='contents order-2 order-md-1'>
							<div className='container'>
								<div className='row align-items-center justify-content-center'>
									<div className='col-md-7'>
										<h3 className='title mb-5'>
											Giriş Yap
										</h3>
										<form
											onSubmit={handleSubmit(() => {
												loginUser({ email, password });
											})}>
											{authError === 'unknown' && (
												<p className='text-danger'>
													Bir hata oluştu. Lütfen daha
													sonra tekrar deneyin.
												</p>
											)}

											<div className='form-group first my-2'>
												<label htmlFor='email'>
													E-mail Adresi
												</label>
												<input
													type='text'
													{...register('email', {
														required: true,
														pattern: /^\S+@\S+$/i,
													})}
													className='form-control'
													placeholder='isim@mail.com'
													id='email'
													onChange={handleChange}
												/>
												{errors.email && (
													<p className='text-danger'>
														Lütfen geçerli bir
														e-mail adresi girin.
													</p>
												)}
												{authError ===
													'Incorrect email.' && (
													<p className='text-danger'>
														E-mail adresi kayıtlı
														değil.
													</p>
												)}
											</div>
											<div className='form-group last mb-3'>
												<label htmlFor='password'>
													Şifre
												</label>
												<input
													type='password'
													{...register('password', {
														required: true,
													})}
													className='form-control'
													placeholder='************'
													id='password'
													onChange={handleChange}
													onKeyDown={(event) => {
														if (
															event.key ===
															'Enter'
														) {
															handleSubmit(() => {
																loginUser({
																	email,
																	password,
																});
															});
														}
													}}
												/>{' '}
												{errors.password && (
													<p className='text-danger'>
														Lütfen geçerli bir şifre
														girin.
													</p>
												)}
												{authError ===
													'Incorrect password.' && (
													<p className='text-danger'>
														Hatalı şifre.
													</p>
												)}
											</div>

											<div className='d-flex mb-5 align-items-center'>
												<span className='ml-auto'>
													<Link
														className='forgot-pass'
														to='/recoverpassword'>
														Şifremi Unuttum
													</Link>
												</span>
											</div>

											<input
												type='submit'
												value='Giriş'
												className='btn btn-block btn-orange'
											/>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};
export default Login;
