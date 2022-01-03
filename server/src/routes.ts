import { Router } from 'express';
import { ActionController } from './controllers/ActionController';
import { AuthenticationController } from './controllers/AuthenticationController';
import { AuthorizationController } from './controllers/AuthorizationController';
import { TokenHelper } from './helpers/TokenHelper';
import { isLoggedIn } from './middlewares/isLoggedIn';
import { ReqBodyValidatior } from './middlewares/ReqBodyValidator';
import {
  invalidateTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  userActionValidator,
  validateActionValidator,
} from './validators/RequestsBodyValidator';

export const router = Router();

const { login, logout, refreshToken, register, invalidate } =
  new AuthenticationController(new TokenHelper());
const { validatePermission } = new AuthorizationController();
const { addAction, addUserAction } = new ActionController();

router.post('/register', registerValidator(), ReqBodyValidatior, register);
router.post('/login', loginValidator(), ReqBodyValidatior, login);
router.post('/logout', refreshTokenValidator(), ReqBodyValidatior, logout);
router.post(
  '/invalidate',
  invalidateTokenValidator(),
  ReqBodyValidatior,
  isLoggedIn,
  invalidate
);
router.post(
  '/refresh-token',
  refreshTokenValidator(),
  ReqBodyValidatior,
  refreshToken
);
router.post(
  '/validate-action',
  validateActionValidator(),
  ReqBodyValidatior,
  isLoggedIn,
  validatePermission
);
router.post(
  '/add-action',
  validateActionValidator(),
  ReqBodyValidatior,
  isLoggedIn,
  addAction
);
router.post(
  '/add-user-action',
  userActionValidator(),
  ReqBodyValidatior,
  isLoggedIn,
  addUserAction
);
