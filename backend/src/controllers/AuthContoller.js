import bcrypt from 'bcrypt';
import lodash from 'lodash';
import { COOKIE_TOKEN_KEY } from '../constants';
import { UserModel } from '../models';
import { EntityResponse } from '../services';
import JWT from './middleware/jwt';

const { isUndefined, isEmpty } = lodash;

let listRefreshToken = [];

export const AuthController = {
  /** Register User */
  registerUser: async (req, res) => {
    try {
      const { username, password, email } = req.body;

      if (isUndefined(username) || isUndefined(password) || isUndefined(email)) {
        return res.json(EntityResponse.error('username, password, email is required'));
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const newUser = new UserModel({ username, email, password: hashed });
      const user = await newUser.save();

      return res.json(EntityResponse.sucess(user));
    } catch (error) {
      return res.json(EntityResponse.error(error));
    }
  },
  /** Login User */
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (isUndefined(username) || isUndefined(password)) {
        return res.json(EntityResponse.error('username, password is required'));
      }

      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.json(EntityResponse.error('User not found!. Username is wrong!'));
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.json(EntityResponse.error('Password is wrong!'));
      }

      const { email, id, admin } = user;
      const token = JWT.sign({ id, username, email, admin });
      const refreshToken = JWT.signRefresh({ id, username, email, admin });

      listRefreshToken.push(refreshToken);

      res.cookie(COOKIE_TOKEN_KEY, refreshToken, {
        httpOnly: true,
        secure: false, //dev: false, production: true
        path: '/',
        sameSite: 'strict',
      }); //gán refreshToken lại vào cookie, với các option để bảo mật token

      return res.json(EntityResponse.sucess({ id, username, admin, email, token }));
    } catch (error) {
      return res.json(EntityResponse.error(error));
    }
  },
  /** Refresh Token */
  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies[COOKIE_TOKEN_KEY];
      if (!refreshToken) {
        return res.status(401).json(EntityResponse.error('You are not authenticated', 401));
      }
      if (!listRefreshToken.includes(refreshToken)) {
        return res.status(403).json(EntityResponse.error('Refresh Token is not valid', 403));
      }
      const objToken = JWT.verifyRefresh(refreshToken);
      if (isEmpty(objToken)) {
        return res.status(401).json(EntityResponse.error('You are not authenticated', 401));
      }

      // clear refresh token old anh add refresh token new
      listRefreshToken = listRefreshToken.filter((tk) => tk !== refreshToken);
      listRefreshToken.push(objToken.refreshToken);

      res.cookie(COOKIE_TOKEN_KEY, objToken.refreshToken, {
        httpOnly: true,
        secure: false, //dev: false, production: true
        path: '/',
        sameSite: 'strict',
      }); //gán refreshToken lại vào cookie, với các option để bảo mật token

      return res.json(EntityResponse.sucess({ token: objToken.token }));
    } catch (error) {
      return res.json(EntityResponse.error(error));
    }
  },
  /** Logout User */
  logoutUser: async (req, res) => {
    try {
      const refreshToken = req.cookies[COOKIE_TOKEN_KEY];

      res.clearCookie(COOKIE_TOKEN_KEY);
      listRefreshToken = listRefreshToken.filter((tk) => tk !== refreshToken);

      return res.json(EntityResponse.sucess());
    } catch (error) {
      return res.json(EntityResponse.error(error));
    }
  },
};
