import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

/**
 * [X] Recebimento das informações
 * [X] Tratativa de erros e exeções
 * [X] Acesso ao repositorio
 */

interface RequestDTO {
  provider: string;
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
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentsRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentsRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentRepository.findBydate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
