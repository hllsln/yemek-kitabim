import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
	const [recipeName, setRecipeName] = useState();
	const navigate = useNavigate();

	return (
		<div className='d-flex no-wrap align-items-center'>
			<input
				type='search'
				name='search'
				className='form-control search my-2'
				placeholder='Tarif Ara...'
				aria-label='Search'
				onChange={(e) => setRecipeName(e.target.value)}
			/>

			<img
				className='btn p-1 m-1 text-center'
				src='assets/search.png'
				height={'36px'}
				alt='search'
				onClick={() => {
					if (recipeName) {
						navigate('/recipes', {
							state: { recipeName: recipeName },
						});
					}
				}}></img>
		</div>
	);
};
export default Search;
