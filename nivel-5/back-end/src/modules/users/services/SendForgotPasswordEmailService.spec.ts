import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

// RED
// GREEN
// REFACTOR

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokenRepository = new FakeUserTokensRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokenRepository,
        );
    });

    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'GoBarber',
            email: 'contato@gobarber.com',
            password: '12345',
        });

        await sendForgotPasswordEmail.execute({
            email: 'contato@gobarber.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should be able to recover the password using the email', async () => {
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'contato@gobarber.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');
        const user = await fakeUsersRepository.create({
            name: 'GoBarber',
            email: 'contato@gobarber.com',
            password: '12345',
        });

        await sendForgotPasswordEmail.execute({
            email: 'contato@gobarber.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
