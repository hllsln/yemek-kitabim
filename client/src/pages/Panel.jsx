import Header from '../partials/Header.jsx';
import Footer from '../partials/Footer.jsx';
import Table from '../components/Table.jsx';
import { useData } from '../contexts/DataContext.jsx';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { EditUser } from '../components/Modals.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Panel = () => {
	const { categories, properties, recipes, users } = useData();
	const [selectedTable, setSelectedTable] = useState('categories');
	const [tableData, setTableData] = useState(categories);
	const [selectedRow, setSelectedRow] = useState({});
	const { currentUser, isLoggedIn } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		setSelectedTable('categories');
	}, []);

	useEffect(() => {
		if (!isLoggedIn || currentUser.username !== 'admin') {
			navigate('/');
		}
		console.log(currentUser);
	}, [isLoggedIn, navigate, currentUser]);

	useEffect(() => {
		switch (selectedTable) {
			case 'categories': {
				setTableData({
					title: 'Kategoriler',
					columns: [
						{
							name: 'Kategori',
							selector: (row) => row.categoryName,
							sortable: true,
						},
					],
					data: categories,
				});
				break;
			}
			case 'properties': {
				setTableData({
					title: 'Özellikler',
					columns: [
						{
							name: 'Özellik',
							selector: (row) => row.propertyName,
							sortable: true,
						},
					],
					data: properties,
				});
				break;
			}
			case 'recipes': {
				setTableData({
					title: 'Tarifler',
					columns: [
						{
							name: 'İsim',
							selector: (row) => row.recipeName,
							sortable: true,
						},
						{
							name: 'Kategori',
							selector: (row) => {
								const category = categories.find(
									(ctg) => row.category === ctg._id
								);
								if (category) return category.categoryName;
							},
							sortable: true,
						},
						{
							name: 'Eklenme Tarihi',
							selector: (row) =>
								dayjs(row.datePosted).format('DD/MM/YYYY'),
							sortable: true,
						},
						{
							name: 'Ekleyen',
							selector: (row) => {
								const user = users.find(
									(usr) => row.postedBy === usr._id
								);
								if (user) return user.username;
								else return 'admin';
							},
							sortable: true,
						},
						{
							name: 'İşlemler',
							cell: (row) => (
								<Link
									className='btn btn-sm btn-outline-secondary'
									to={`/recipes/${row._id}`}>
									Düzenle
								</Link>
							),
							allowOverflow: true,
							button: true,
						},
					],
					data: recipes,
				});
				break;
			}
			case 'users': {
				setTableData({
					title: 'Üyeler',
					columns: [
						{
							name: 'Kullanıcı Adı',
							selector: (row) => row.username,
							sortable: true,
						},
						{
							name: 'E-mail',
							selector: (row) => row.email,
							sortable: true,
						},
						{
							name: 'Üyelik Tarihi',
							selector: (row) =>
								dayjs(row.membershipDate).format('DD/MM/YYYY'),
							sortable: true,
						},
						{
							name: 'İşlemler',
							cell: (row) => (
								<button
									data-bs-toggle='modal'
									data-bs-target='#editUser'
									className='btn btn-sm btn-outline-secondary'
									onClick={() => setSelectedRow(row)}>
									Düzenle
								</button>
							),
							allowOverflow: true,
							button: true,
						},
					],
					data: users,
				});
				break;
			}
			default:
				break;
		}
	}, [selectedTable, categories, properties, recipes, users]);

	return (
		<>
			<Header />

			<div className='container main-container d-flex align-items-start mt-5'>
				<div className='container bg-white pt-2'>
					<div className='my-2'>
						<button
							className='btn btn-sm btn-green me-2'
							name='categories'
							onClick={(e) => setSelectedTable(e.target.name)}>
							Kategoriler
						</button>
						<button
							className='btn btn-sm btn-green me-2'
							name='properties'
							onClick={(e) => setSelectedTable(e.target.name)}>
							Özellikler
						</button>
						<button
							className='btn btn-sm btn-green me-2'
							name='recipes'
							onClick={(e) => setSelectedTable(e.target.name)}>
							Tarifler
						</button>
						<button
							className='btn btn-sm btn-green me-2'
							name='users'
							onClick={(e) => setSelectedTable(e.target.name)}>
							Üyeler
						</button>
					</div>

					<Table tableData={tableData} />
				</div>
			</div>
			<EditUser user={selectedRow} />
			<Footer />
		</>
	);
};
export default Panel;
