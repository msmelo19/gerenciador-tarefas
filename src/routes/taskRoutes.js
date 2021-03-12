import { Router } from 'express';
import TaskController from '../controllers/TaskController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, TaskController.index);
router.get('/:id', loginRequired, TaskController.show);
router.post('/', loginRequired, TaskController.create);
router.put('/:id', loginRequired, TaskController.update);
router.delete('/:id', loginRequired, TaskController.delete);

export default router;
