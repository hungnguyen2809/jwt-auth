import { Router } from 'express';
import authRouter from './AuthRouter';
import userRouter from './UserRouter';

const rotues = Router();

//AUTH ROUTER
rotues.use('/auth', authRouter);

//USER ROUTER
rotues.use('/user', userRouter);

export default rotues;
