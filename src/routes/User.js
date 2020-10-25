import { Router } from 'express';
import * as user from '../controllers/User';
import {auth, isAdmin} from '../middlewares/auth';

const router = Router();

router.post('/signup', user.signup);
router.post('/profile/:id',auth, user.profile);
router.post('/login', user.login);
router.get('/getAll',isAdmin, user.getAll);

export  default router;