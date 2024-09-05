import { Link } from 'react-router-dom';

const Category = ({ category, imageUrl }) => {
	const { _id, categoryName } = category;
	return (
		<div className='card card-cg  d-flex col-3 m-2 text-center'>
			<img
				className='pb-2'
				src={imageUrl}
				alt='cardimage'
				width='auto'
				height={'200px'}
			/>
			<div className='p-2 '>
				<h3 className='title'>
					<Link
						to={`/results`}
						state={{ category: category._id }}>
						{categoryName}
					</Link>
				</h3>
			</div>
		</div>
	);
};
export default Category;
