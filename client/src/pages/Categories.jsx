import Header from '../partials/Header.jsx';
import Footer from '../partials/Footer.jsx';
import { useData } from '../contexts/DataContext.jsx';
import Category from '../components/Category.jsx';
import { Link } from 'react-router-dom';

const Categories = () => {
	const { categories } = useData();
	return (
		<>
			<Header />
			<div className='mt-5 pt-5 px-4'>
				<ol className='breadcrumb text'>
					<li className='breadcrumb-item'>
						<Link to={'/'}>Anasayfa</Link>
					</li>
					<li className='breadcrumb-item'>
						<Link to={'/recipes'}>Tarifler</Link>
					</li>
					<li className='breadcrumb-item active'>Kategoriler</li>
				</ol>
			</div>
			<div className='container main-container d-flex col-auto flex-wrap justify-content-center py-4'>
				{categories &&
					categories.map((category, index) => (
						<Category
							imageUrl={`assets/categories/${category._id}.jpg`}
							key={category._id}
							category={category}></Category>
					))}
			</div>
			<Footer />
		</>
	);
};
export default Categories;
