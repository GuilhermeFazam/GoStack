import { getRepository, Repository, Raw } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IFindAllInMonthProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findBydate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        return findAppointment;
    }

    public async findAllInMonthFromProvider({
        provider_id,
        month,
        year,
    }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
        const parseMonth = String(month).padStart(2, '0');
        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFildName =>
                        `to_char(${dateFildName}, 'MM-YYYY') = '${parseMonth}-${year}'`,
                ),
            },
        });

        return appointments;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({
            provider_id,
            date,
        });

        await this.ormRepository.save(appointment);
        return appointment;
    }
}

export default AppointmentsRepository;
