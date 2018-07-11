import { Router } from 'express';
import detail from './detail';

const router = new Router();

router.get('/detail', detail);

export default router;
