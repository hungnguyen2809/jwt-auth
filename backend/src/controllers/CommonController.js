import { EntityResponse } from '../services';

const CommonController = {
  uploadSingle: (req, res) => {
    res.json(EntityResponse.sucess(req.file));
  },
  uploadMulti: (req, res) => {
    res.json(EntityResponse.sucess(req.files));
  },
};

export default CommonController;
