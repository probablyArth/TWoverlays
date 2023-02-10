import { Router } from 'express';
import { insertAccessToken } from '../services/auth.js';

const authRouter = Router();

authRouter.post('/', async (req, res) => {
  const accessToken = req.body.accessToken as string;
  try {
    await insertAccessToken(accessToken);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return res.status(505).send({ message: e.message });
  }
  return res.status(201).send({ message: 'Inserted succesfully!' });
});

export default authRouter;
