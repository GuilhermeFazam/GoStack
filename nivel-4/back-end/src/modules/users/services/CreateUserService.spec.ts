import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });
    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'GoBarber',
            email: 'contato@gobarber.com',
            password: '12345',
        });

        expect(user).toHaveProperty('id');
    });

    it('should NOT be able to create a new user with same email from another', async () => {
        await createUser.execute({
            name: 'GoBarber',
            email: 'contato@gobarber.com',
            password: '12345',
        });

        await expect(
            createUser.execute({
                name: 'GoBarber',
                email: 'contato@gobarber.com',
                password: '12345',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
