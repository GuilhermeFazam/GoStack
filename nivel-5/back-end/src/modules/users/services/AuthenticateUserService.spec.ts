import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to authenticate', async () => {
        const user = await fakeUsersRepository.create({
            name: 'GoBarber',
            email: 'contato@gobarber.com',
            password: '12345',
        });

        const response = await authenticateUser.execute({
            email: 'contato@gobarber.com',
            password: '12345',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should NOT be able to authenticate with non existing user', async () => {
        await expect(
            authenticateUser.execute({
                email: 'contato@gobarber.com',
                password: '12345',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should NOT be able to authenticate with wrong password', async () => {
        await fakeUsersRepository.create({
            name: 'GoBarber',
            email: 'contato@gobarber.com',
            password: '12345',
        });

        await expect(
            authenticateUser.execute({
                email: 'contato@gobarber.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
