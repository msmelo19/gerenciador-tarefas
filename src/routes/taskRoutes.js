import { Router } from 'express';
import TaskController from '../controllers/TaskController';

const router = new Router();

router.get('/', TaskController.index);
router.post('/', TaskController.create);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);

export default router;
