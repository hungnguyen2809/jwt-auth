import lodash from 'lodash';
import { UserModel } from '../models';
import { EntityResponse } from '../services';

const { isUndefined } = lodash;

export const UserController = {
  /** Get all user */
  getAllUser: async (req, res) => {
    try {
      const users = await UserModel.find();
      return res.json(EntityResponse.sucess(users));
    } catch (error) {
      return res.json(EntityResponse.error(error));
    }
  },
  /** Get all user */
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      if (isUndefined(id)) {
        return res.json(EntityResponse.error('Invalid request, request miss id'));
      }
      // const users = await UserModel.findByIdAndDelete(id); // => find and delete
      const users = await UserModel.findById(id);
      if (!users) {
        return res.json(EntityResponse.error('User not found!'));
      }
      return res.json(EntityResponse.sucess(users, 'Delete success!'));
    } catch (error) {
      return res.json(EntityResponse.error(error));
    }
  },
};
