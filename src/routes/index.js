import { Router } from 'express';
import userRoutes from './User';
import blogRoutes from './Blog';
import commentRoutes from './Comment';
import queryRoutes from './Query';


const router = Router();


router.use('/user', userRoutes);
router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);
router.use('/query', queryRoutes);

export default router;
