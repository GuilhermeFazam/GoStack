import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Guilherme Fazam',
    email: 'glrm1991@gmail.com.br',
    password_hash: '2wsx!Qaz',
  });

  return res.json(user);
});

export default routes;
