import { EntityResponse } from '../services';
import JWT from './middleware/jwt';
import MULTER from './middleware/mult';

const MiddlewareController = {
  verify: (req, res, next) => {
    JWT.verify(req, res, next);
  },
  verifyAdmin: (req, res, next) => {
    JWT.verify(req, res, () => {
      // user ở đây có được là sau khi xác thực thì đã gán thông tin lại vào request
      if (req.user.id === req.params.id || req.user.admin) {
        // mình là chính mình hoặc là admin
        next();
      } else {
        res.status(403).json(EntityResponse.error('You are not alowed to delete other', 403));
      }
    });
  },
  uploadSingle: (req, res, next) => {
    JWT.verify(req, res, () => {
      MULTER.uploadSingle(req, res, next);
    });
  },
  uploadMulti: (req, res, next) => {
    JWT.verify(req, res, () => {
      MULTER.uploadMulti(req, res, next);
    });
  },
};

export default MiddlewareController;
