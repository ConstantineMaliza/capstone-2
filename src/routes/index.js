import { Router } from 'express';
import userRoutes from './User';
import blogRoutes from './Blog';

const router = Router();


router.use('/user', userRoutes);
router.use('/blog', blogRoutes);

export default router;
