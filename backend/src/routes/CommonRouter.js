import { Router } from 'express';
import CommonController from '../controllers/CommonController';
import MiddlewareController from '../controllers/MiddlewareController';

const commonRouter = Router();

commonRouter.post('/upload', MiddlewareController.uploadSingle, CommonController.uploadSingle);
commonRouter.post('/uploads', MiddlewareController.uploadMulti, CommonController.uploadMulti);

export default commonRouter;
