import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useData } from '../contexts/DataContext.jsx';
import axios from 'axios';
import Comment from './Comment.jsx';

const CommentSection = (props) => {
	const { recipeId } = props;
	const { users, recipes, comments, setComments } = useData();
	const { currentUser, isLoggedIn } = useAuth();
	const [comment, setComment] = useState();
	const [recipeComments, setRecipeComments] = useState();

	useEffect(() => {
		if (comments) {
			const foundComments = comments.filter(
				(com) => com.recipe === recipeId
			);
			setRecipeComments(foundComments);
			console.log(foundComments);
			console.log(comments);
		}
	}, [comments]);

	const postComment = () => {
		axios({
			method: 'post',
			url: 'http://localhost:5000/data/comments/post',
			data: {
				userId: currentUser._id,
				recipeId: recipeId,
				comment: comment,
			},
		})
			.then((result) => {
				console.log(result);
				const newComment = result.data;
				setComments((prev) => [...prev, newComment]);
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className='container'>
			<div className='be-comment-block'>
				<h1 className='comments-title'>
					Yorumlar ({recipeComments ? recipeComments.length : 0})
				</h1>

				{recipeComments &&
					recipeComments.map((com) => <Comment comment={com} />)}

				{isLoggedIn && (
					<form className='form-block'>
						<div className='row'>
							<div className='col-xs-12'>
								<div className='form-group'>
									<textarea
										className='form-input'
										required=''
										placeholder=''
										onChange={(e) =>
											setComment(e.target.value)
										}></textarea>
								</div>
							</div>
						</div>
						<a
							className='btn btn-green pull-right'
							onClick={postComment}>
							Yorum Ekle
						</a>
					</form>
				)}
			</div>
		</div>
	);
};
export default CommentSection;
