import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthProviderDTO from '../dtos/IFindAllInMonthProviderDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;

    findBydate(date: Date): Promise<Appointment | undefined>;
    findAllInMonthFromProvider(
        data: IFindAllInMonthProviderDTO,
    ): Promise<Appointment[]>;
}
