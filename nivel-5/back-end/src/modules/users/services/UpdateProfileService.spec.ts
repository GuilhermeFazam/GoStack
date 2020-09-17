// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'GoBarber',
            email: 'contato@gobarber.com',
            password: '12345',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'GoBarba',
            email: 'contato@gobarba.com',
        });

        expect(updatedUser.name).toBe('GoBarba');
        expect(updatedUser.email).toBe('contato@gobarba.com');
    });

    it('should NOT be able to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'GoBarber',
            email: 'contato@gobarber.com',
            password: '12345',
        });

        const user = await fakeUsersRepository.create({
            name: 'GoBarba',
            email: 'teste@gobarber.com',
            password: '12345',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'GoBarba',
                email: 'contato@gobarber.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should NOT be able show update the update from non-existing user', async () => {
        expect(
            updateProfile.execute({
                user_id: 'non-existing-user',
                name: 'GoBarba',
                email: 'contato@gobarber.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'GoBarber',
            email: 'contato@gobarber.com',
            password: '12345',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'GoBarba',
            email: 'contato@gobarba.com',
            old_password: '12345',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should NOT able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'GoBarber',
            email: 'contato@gobarber.com',
            password: '12345',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'GoBarba',
                email: 'contato@gobarba.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should NOT able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'GoBarber',
            email: 'contato@gobarber.com',
            password: '12345',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'GoBarba',
                email: 'contato@gobarba.com',
                old_password: 'wrong-old-password',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
