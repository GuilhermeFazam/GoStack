import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
    findBydate(data: Date): Promise<Appointment | undefined>;
}
