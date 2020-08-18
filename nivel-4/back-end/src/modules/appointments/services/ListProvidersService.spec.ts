// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProvidersService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listProviders = new ListProvidersService(fakeUsersRepository);
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'GoBarber1',
            email: 'contato1@gobarber.com',
            password: '12345',
        });
        const user2 = await fakeUsersRepository.create({
            name: 'GoBarber2',
            email: 'contato2@gobarber.com',
            password: '12345',
        });
        const loggedUser = await fakeUsersRepository.create({
            name: 'GoBarber',
            email: 'contato@gobarber.com',
            password: '12345',
        });

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toStrictEqual([user1, user2]);
    });
});
