import { useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext.jsx';
import axios from 'axios';

export const EditUser = (props) => {
	const { _id, username, email } = props.user;
	const [newUsername, setNewUsername] = useState(username);
	const [newEmail, setNewEmail] = useState(email);
	const { users, setUsers } = useData();

	const handleChange = (event) => {
		const { id, value } = event.target;

		if (id === 'username') {
			setNewUsername(value);
		}
		if (id === 'email') {
			setNewEmail(value);
		}
	};

	const updateUser = () => {
		const formData = new FormData();
		formData.append(
			'userData',
			JSON.stringify({
				userId: _id,
				email: newEmail,
				username: newUsername,
			})
		);

		console.log(formData);
		axios({
			method: 'post',
			url: 'http://localhost:5000/data/users/update',
			data: formData,
		})
			.then((result) => {
				if (result.data.user) {
					const updatedUser = result.data.user;

					const updatedUsers = users.filter(
						(usr) => usr._id !== updatedUser._id
					);
					updatedUsers.push(updatedUser);

					console.log(updatedUsers);

					setUsers(updatedUsers);
				}
			})
			.catch((error) => console.log(error));

		setNewUsername('');
		setNewEmail('');
	};

	return (
		<div
			class='modal fade'
			id='editUser'
			tabindex='-1'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'>
			<div class='modal-dialog'>
				<div class='modal-content'>
					<div class='modal-header'>
						<h5
							class='modal-title'
							id='exampleModalLabel'>
							Kullanıcıyı Düzenle
						</h5>
						<button
							type='button'
							class='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'></button>
					</div>
					<div class='modal-body'>
						<form>
							<div class='mb-3'>
								<label
									for='username'
									class='form-label'>
									Kullanıcı Adı
								</label>
								<input
									type='text'
									class='form-control'
									id='username'
									placeholder={username}
									onChange={(event) => handleChange(event)}
								/>
							</div>
							<div class='mb-3'>
								<label
									for='email'
									class='form-label'>
									E-mail
								</label>
								<input
									type='text'
									class='form-control'
									id='email'
									placeholder={email}
									onChange={(event) => handleChange(event)}
								/>
							</div>
						</form>
					</div>
					<div class='modal-footer'>
						<button
							type='button'
							class='btn btn-sm btn-green '
							data-bs-dismiss='modal'>
							İptal
						</button>
						<button
							type='button'
							class='btn btn-sm btn-orange'
							data-bs-dismiss='modal'
							onClick={updateUser}>
							Kaydet
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export const EditCategory = (props) => {
	const { _id, categoryName } = props.category;

	return (
		<div
			class='modal fade'
			id='editCategory'
			tabindex='-1'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'>
			<div class='modal-dialog'>
				<div class='modal-content'>
					<div class='modal-header'>
						<h5
							class='modal-title'
							id='exampleModalLabel'>
							Kategoriyi Düzenle
						</h5>
						<button
							type='button'
							class='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'></button>
					</div>
					<div class='modal-body'>
						<form>
							<div class='mb-3'>
								<label
									for='name'
									class='form-label'>
									Kategori İsmi
								</label>
								<input
									type='text'
									class='form-control'
									id='name'
									placeholder={categoryName}
								/>
							</div>
						</form>
					</div>
					<div class='modal-footer'>
						<button
							type='button'
							class='btn btn-sm btn-green '
							data-bs-dismiss='modal'>
							İptal
						</button>
						<button
							type='button'
							class='btn btn-sm btn-orange'
							data-bs-dismiss='modal'>
							Kaydet
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
