import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointimentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, date } = request.body;
        const parcedDate = parseISO(date);
        const createAppontiment = container.resolve(CreateAppointmentService);

        const appointment = await createAppontiment.execute({
            date: parcedDate,
            provider_id,
        });

        return response.json(appointment);
    }
}
