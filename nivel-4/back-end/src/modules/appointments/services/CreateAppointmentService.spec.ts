import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('shold be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const appointment = createAppointment.execute({
            date: new Date(),
            provider_id: '123123213',
        });

        expect(await appointment).toHaveProperty('id');
        expect((await appointment).provider_id).toBe('123123213');
    });

    // it('Shold not be able to create tow appointments on the same time', () => {
    //     expect(1 + 2).toBe(3);
    // });
});
