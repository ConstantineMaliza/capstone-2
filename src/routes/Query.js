import {Router} from 'express';
import * as query from '../controllers/Query';
import {auth,isAdmin } from '../middlewares/auth';

const router = Router ();

router.route('/')
    .get(auth,isAdmin, query.getAll)
    .post(query.create);

export default router;