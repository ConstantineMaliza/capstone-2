import { Router } from 'express';
import * as user from '../controllers/User';
import {auth, isAdmin} from '../middlewares/auth';
import {uploadImage} from '../middlewares/image';

const router = Router();

router.post('/signup', user.signup);
router.post('/profile/:id',auth,uploadImage, user.profile);
router.post('/login', user.login);
router.get('/getAllUser',auth,isAdmin, user.getAll);

export  default router;