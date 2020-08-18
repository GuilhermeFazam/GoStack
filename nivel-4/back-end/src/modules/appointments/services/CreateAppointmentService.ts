import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

// SOLID

// # Single Responsability Principle
// Open Closed  Principle
// # Liskov Substitution Principle
// Interface Segregation Principle
// # Dependence Invertion Principle

interface IRequest {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentRepository')
        private appointmentRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        date,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentRepository.findBydate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentRepository.create({
            provider_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
