import Header from '../partials/Header.jsx';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

const Register = () => {
	const navigate = useNavigate();
	const { registerUser, isLoggedIn, authError, setAuthError } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/');
		}
	});

	return (
		<>
			{isLoggedIn ? null : (
				<>
					<Header />
					<div className='d-lg-flex half'>
						<div className='bg bg2 order-2 order-md-1'></div>
						<div className='contents order-1 order-md-2'>
							<div className='container'>
								<div className='row align-items-center justify-content-center'>
									<div className='col-md-7'>
										<h3 className='title mb-5'>Kaydol</h3>
										<form
											onSubmit={handleSubmit((data) => {
												registerUser(data);
											})}
											onKeyDown={(event) => {
												if (event.key === 'Enter') {
													handleSubmit((data) => {
														registerUser(data);
													});
												}
											}}>
											{authError === 'unknown' && (
												<p className='text-danger'>
													Bir hata oluştu. Lütfen daha
													sonra tekrar deneyin.
												</p>
											)}
											<div className='form-group first my-2'>
												<label htmlFor='username'>
													Kullanıcı Adı
												</label>
												<input
													type='text'
													{...register('username', {
														required: true,
													})}
													className='form-control'
													placeholder='kullaniciadi'
													id='username'
													onChange={() =>
														setAuthError(null)
													}
												/>
												{errors.username && (
													<p className='text-danger'>
														Lütfen geçerli bir
														kullanıcı adı girin.
													</p>
												)}
												{authError === 'username' && (
													<p className='text-danger'>
														Kullanıcı adı zaten
														alınmış.
													</p>
												)}
											</div>
											<div className='form-group my-2'>
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
													onChange={() =>
														setAuthError(null)
													}
												/>
												{errors.email && (
													<p className='text-danger'>
														Lütfen geçerli bir
														e-mail adresi girin.
													</p>
												)}
												{authError === 'email' && (
													<p className='text-danger'>
														E-posta adresi zaten
														alınmış.
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
												/>{' '}
												{errors.password && (
													<p className='text-danger'>
														Lütfen geçerli bir şifre
														girin.
													</p>
												)}
											</div>

											<input
												type='submit'
												value='Kaydol'
												className='btn btn-block btn-orange mt-4'
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
export default Register;
