import { Router } from 'express';
import { errorHandler } from '../middlewares.js';
import { deleteAccessTokenIfExists, getAccessToken, insertAccessToken } from '../services/auth.js';

const authRouter = Router();

authRouter.post('/', async (req, res) => {
  const accessToken = req.body.accessToken as string;
  try {
    await deleteAccessTokenIfExists();
    await insertAccessToken(accessToken);  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e) {
    return errorHandler(e as Error, req, res);
  }
  return res.status(201).send({ message: 'Inserted succesfully!' });
});

export default authRouter;
