import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// SoC: Separation of Concerns (Separação de preocupações);

// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointment = await appointmentRepository.find();

    return response.json(appointment);
});

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;
    const parcedDate = parseISO(date);
    const createAppontiment = new CreateAppointmentService();
    const appointment = await createAppontiment.execute({
        date: parcedDate,
        provider_id,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
