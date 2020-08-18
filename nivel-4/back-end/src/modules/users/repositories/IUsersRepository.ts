import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProviders from '../dtos/IFindAllProvidersDTO';

export default interface IUserRepository {
    findAllProvider(data: IFindAllProviders): Promise<User[]>;

    findByEmail(email: string): Promise<User | undefined>;

    create(data: ICreateUserDTO): Promise<User>;

    save(data: User): Promise<User>;
}
