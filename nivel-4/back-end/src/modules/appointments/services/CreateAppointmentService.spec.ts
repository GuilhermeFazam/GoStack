import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });

    it('shold be able to create a new appointment', async () => {
        const appointment = createAppointment.execute({
            date: new Date(2020, 4, 10, 11),
            user_id: '123123213',
            provider_id: '123123213',
        });

        expect(await appointment).toHaveProperty('id');
        expect((await appointment).provider_id).toBe('123123213');
    });

    it('Shold not be able to create tow appointments on the same time', async () => {
        const appointmentDate = new Date();

        await createAppointment.execute({
            date: appointmentDate,
            user_id: '123123213',
            provider_id: '123123213',
        });

        expect(
            createAppointment.execute({
                date: appointmentDate,
                user_id: '123123213',
                provider_id: '123123213',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
