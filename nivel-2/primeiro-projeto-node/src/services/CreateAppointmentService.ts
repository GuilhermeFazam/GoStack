import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

/**
 * [X] Recebimento das informações
 * [X] Tratativa de erros e exeções
 * [X] Acesso ao repositorio
 */

interface RequestDTO {
    provider_id: string;
    date: Date;
}

// DRY: Don't repeat Yourself - Não repita regra de negocio dentro da sua aplicação

/**
 * Dependency Inversion (SOLID)
 *
 *
 * SRP (Single Responsability Principle);
 * OCP (Open–closed Principle);
 * LSP (Liskov substitution Principle);
 * ISP (Interface segregation Principle);
 * DIP (Dependency Inversion Principle).
 *
 */

class CreateAppointmentService {
    public async execute({
        provider_id,
        date,
    }: RequestDTO): Promise<Appointment> {
        const appointmentRepository = getCustomRepository(
            AppointmentRepository,
        );
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentRepository.findBydate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = appointmentRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
