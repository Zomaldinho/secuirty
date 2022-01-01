import { Router } from 'express';
import { AuthenticationController } from './controllers/AuthenticationController';
import { AuthorizationController } from './controllers/AuthorizationController';
import { TokenHelper } from './helpers/TokenHelper';
import { isLoggedIn } from './middlewares/isLoggedIn';
import { ReqBodyValidatior } from './middlewares/ReqBodyValidator';
import {
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  validateActionValidator,
} from './validators/RequestsBodyValidator';

export const router = Router();

const { login, logout, refreshToken, register } = new AuthenticationController(
  new TokenHelper()
);
const { validatePermission } = new AuthorizationController();

router.post('/register', registerValidator(), ReqBodyValidatior, register);
router.post('/login', loginValidator(), ReqBodyValidatior, login);
router.post('/logout', refreshTokenValidator(), ReqBodyValidatior, logout);
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
