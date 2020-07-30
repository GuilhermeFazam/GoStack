import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//     const appointment = await appointmentsRepository.find();

//     return response.json(appointment);
// });

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;
    const parcedDate = parseISO(date);

    const createAppontiment = new CreateAppointmentService(
        appointmentsRepository,
    );

    const appointment = await createAppontiment.execute({
        date: parcedDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
