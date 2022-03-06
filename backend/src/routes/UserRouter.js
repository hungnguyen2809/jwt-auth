import { Router } from 'express';
import MiddlewareController from '../controllers/MiddlewareController';
import { UserController } from '../controllers/UserController';

const userRouter = Router();

userRouter.get('/', MiddlewareController.verify, UserController.getAllUser);
userRouter.delete('/:id', MiddlewareController.verifyAdmin, UserController.deleteUser);

export default userRouter;
