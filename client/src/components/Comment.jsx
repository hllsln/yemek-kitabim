import { useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext.jsx';
import dayjs from 'dayjs';

const Comment = (props) => {
	const { comment } = props;
	const { users } = useData();
	const [user, setUser] = useState();

	useEffect(() => {
		const userInfo = users.find((usr) => usr._id === comment.postedBy);
		setUser(userInfo);
	}, []);

	return (
		<div className='be-comment'>
			<div className='be-img-comment'>
				<img
					src={
						user && user.avatar
							? `http://localhost:5000/uploads/${user.avatar}`
							: `http://localhost:5000/uploads/placeholder-avatar.jpg`
					}
					alt=''
					className='be-ava-comment'></img>
			</div>
			<div className='be-comment-content'>
				<span className='be-comment-name'>
					<h6 href='text blog-detail-2.html'>
						{user && user.username}
					</h6>
				</span>
				<span className='be-comment-time'>
					<i className='fa fa-clock-o'></i>
					{dayjs(comment.datePosted).format('DD/MM/YYYY')}
				</span>

				<p className='be-comment-text'>{comment.comment}</p>
			</div>
		</div>
	);
};
export default Comment;
