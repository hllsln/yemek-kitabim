import Header from '../partials/Header.jsx';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios';

const RecoverPassword = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { isLoggedIn } = useAuth();
	const [email, setEmail] = useState();
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);

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

		setMessage(null);
		setError(null);
	};

	const resetPassword = () => {
		axios({
			method: 'post',
			url: 'http://localhost:5000/auth/forgotpassword',
			data: {
				email,
			},
		})
			.then((result) => {
				setMessage(result.data.message);
			})
			.catch((error) => console.log(error));

		setEmail('');
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
										<h3 className='title mb-3'>
											Şifrenizi Mi Unuttunuz?
										</h3>
										<form>
											{error && (
												<p className='text-danger'>
													Bir hata oluştu. Lütfen daha
													sonra tekrar deneyin.
												</p>
											)}
											{message && (
												<p className='text-info'>
													Eğer e-mail adresi
													kayıtlıysa yeni şifrenizi
													içeren bir mail alacaksınız.
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
											</div>

											<button
												type='button'
												className='btn btn-block btn-orange'
												onClick={resetPassword}>
												Şifremi Yenile
											</button>
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
export default RecoverPassword;
