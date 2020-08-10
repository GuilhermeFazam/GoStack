import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('shold be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const appointment = createAppointment.execute({
            date: new Date(2020, 4, 10, 11),
            provider_id: '123123213',
        });

        expect(await appointment).toHaveProperty('id');
        expect((await appointment).provider_id).toBe('123123213');
    });

    it('Shold not be able to create tow appointments on the same time', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const appointmentDate = new Date();

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123213',
        });

        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '123123213',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
