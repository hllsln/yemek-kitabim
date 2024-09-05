import Header from '../partials/Header.jsx';
import Footer from '../partials/Footer.jsx';

const Error = () => {
	return (
		<>
			<Header />
			<div className='container main-container'>
				<p className='text-center'>Hata: Sayfa bulunamadı.</p>
			</div>
			<Footer />
		</>
	);
};
export default Error;
