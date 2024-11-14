import { Router } from 'express';

import { login, logout, signup } from './authController.js';

export const authRouter: Router = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
