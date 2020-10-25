import {Router} from 'express';
import * as query from '../controllers/Query';
import {isAdmin } from '../middlewares/auth';

const router = Router ();

router.route('/')
    .get(isAdmin, query.getAll)
    .post(query.create);

export default router;