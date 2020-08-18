import IStorageProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class FakeMailProvider implements IStorageProvider {
    private messages: ISendMailDTO[] = [];

    public async sendMail(message: ISendMailDTO): Promise<void> {
        this.messages.push(message);
    }
}
