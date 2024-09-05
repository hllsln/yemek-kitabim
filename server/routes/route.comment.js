import express from 'express';
import getComments from '../controllers/comment/controller.comment.get.js';
import postComment from '../controllers/comment/controller.comment.post.js';

const router = express.Router();

router.get('/', getComments).post('/post', postComment);

export default router;
