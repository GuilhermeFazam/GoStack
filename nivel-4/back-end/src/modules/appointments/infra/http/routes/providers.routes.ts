import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providerRouter = Router();
const providerController = new ProvidersController();
providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providerController.index);

export default providerRouter;
