import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointimentsController from '@modules/appointments/infra/http/controllers/AppointimentsController';

const appointmentsRouter = Router();

const appointimentsController = new AppointimentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//     const appointment = await appointmentsRepository.find();

//     return response.json(appointment);
// });

appointmentsRouter.post('/', appointimentsController.create);

export default appointmentsRouter;
