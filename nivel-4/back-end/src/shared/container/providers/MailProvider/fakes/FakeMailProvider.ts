import IStorageProvider from '../models/IMailProvider';

interface Message {
    to: string;
    body: string;
}

export default class FakeMailProvider implements IStorageProvider {
    private messages: Message[] = [];

    public async sendMail(to: string, body: string): Promise<void> {
        this.messages.push({
            to,
            body,
        });
    }
}
