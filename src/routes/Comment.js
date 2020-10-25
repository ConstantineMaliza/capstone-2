import {Router} from 'express';
import {auth, isAdmin} from '../middlewares/auth';
import * as blog from '../controllers/Blog';

const router = Router();

router.route('/:blogId').post(auth, blog.addComment);
router.route('/:blogId/:commentId').delete(auth,isAdmin, blog.removeComment);


export default router;