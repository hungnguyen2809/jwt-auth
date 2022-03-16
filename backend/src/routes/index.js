import { Router } from 'express';
import authRouter from './AuthRouter';
import commonRouter from './CommonRouter';
import userRouter from './UserRouter';

const rotues = Router();

//AUTH ROUTER
rotues.use('/auth', authRouter);

//USER ROUTER
rotues.use('/user', userRouter);

//COMMON ROUTER
rotues.use('/common', commonRouter);

export default rotues;
