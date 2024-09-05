const Info = ({ title, text, imageUrl }) => {
	return (
		<div className='card info d-flex col-lg-3  col-6 m-2 text-center'>
			<img
				className='pb-2'
				src={imageUrl}
				alt='cardimage'
				width='auto'
				height={'200px'}
			/>
			<div className='p-4 pb-0'>
				<h3 className='title'>{title}</h3>
				<p className='text mb-4'>{text}</p>
			</div>
		</div>
	);
};
export default Info;
