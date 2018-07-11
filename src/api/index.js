import { Router } from 'express';
import home from './home';
import { notFoundRes } from './helper';
import NodeError from '../core/fetch/node-error';

const router = new Router();

router.use('/home', home);
router.use('*', (req, res, next) => {
  const { errmsg, errcode } = notFoundRes.content;
  next(new NodeError(errmsg, 'RequestError', 'not-found', 'frontend', errcode));
});

export default router;
