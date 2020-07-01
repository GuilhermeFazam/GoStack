import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';

import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

// SoC: Separation of Concerns (Separação de preocupações);

// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.get('/', async (request, response) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointment = await appointmentRepository.find();

    return response.json(appointment);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider, date } = request.body;

        const parcedDate = parseISO(date);
        const createAppontiment = new CreateAppointmentService();

        const appointment = await createAppontiment.execute({
            date: parcedDate,
            provider,
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
