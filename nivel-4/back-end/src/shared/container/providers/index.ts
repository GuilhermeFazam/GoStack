import { container } from 'tsyringe';

import mailConfig from '@config/mail';
import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandleBarsMailTemplateProvider from './MailTemplateProvider/implementations/HandleBarsMailTemplateProvider';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandleBarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    mailConfig.driver === 'ethereal'
        ? container.resolve(EtherealMailProvider)
        : container.resolve(SESMailProvider),
);
