import { Router } from 'express';
import * as user from '../controllers/User';

const router = Router();

router.post('/signup', user.signup);
router.post('/profile/:id', user.profile);
router.post('/login', user.login);
router.get('/getAll',user.getAll);

export  default router;