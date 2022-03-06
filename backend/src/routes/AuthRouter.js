import { Router } from 'express';
import { AuthController } from '../controllers/AuthContoller';
import MiddlewareController from '../controllers/MiddlewareController';

const authRouter = Router();

authRouter.post('/login', AuthController.loginUser);
authRouter.post('/register', AuthController.registerUser);
authRouter.get('/refreshToken', AuthController.refreshToken);
authRouter.get('/logout', MiddlewareController.verify, AuthController.logoutUser);

export default authRouter;
