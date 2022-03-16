import multer from 'multer';
import { v4 as uuid } from 'uuid';
import { getDotFileByName } from '../../common';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const dotFile = getDotFileByName(file.originalname);
    cb(null, `${uuid()}.${dotFile}`);
  },
});

const MULTER = {
  uploadSingle: multer({ storage }).single('file'),
  uploadMulti: multer({ storage }).array('file'),
};

export default MULTER;
