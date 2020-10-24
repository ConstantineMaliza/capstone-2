import {Router} from 'express';
import * as blog from '../controllers/Blog';
import {auth} from '../middlewares/auth';
import {uploadImage} from '../middlewares/image';

const router = Router();

router
    .route('/')
    .get(blog.getAll)
    .post(auth, uploadImage, blog.create);

router
    .route('/:blogId')
    .get(blog.getOne)
    .patch(auth, blog.update)
    .delete(auth, blog.deleteOne);
export default router;


