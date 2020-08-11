# Recuperação de senha

**RF - Requisitos Funcionais**

    - O usuário deve poder recuperar sua senha informando o seu e-mail;
    - O usuário deve receber um e-mail com instruções de recuperação de senha;
    - O usuário deve poder resetar sua senha;

**RNF - Requisitos Não Funcionais**

    - Utilizar **Mailtrap** para testar envio de e-mails em ambiente de DEV;
    - Utilizar Amazon SES para envios em produção;
    - O envio de e-mails deve acontecer em 2° plano (background job);

**RN - Regras de negócios**

    - O link enviado por e-mail para resetar a senha, deve expirar em 2hs;
    - O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do Perfil

**RF - Requisitos Funcionais**

    - O usuário deve poder atualizar o seu Perfil: nome, e-mail e senha;

**RN - Regras de negócios** - O usuário não pode alterar seu e-mail para um e-mail já utilizado; - Para atualizar sua senha, o usuário deve informar a senha antiga; - Para atualizar sua senha, o usuário precisa confirmar a nova senha

# Painel do prestador

**RF - Requisitos Funcionais**

    - O usuário deve poder listar seus agendamentos de um dia especifico;
    - O prestador deve receber uma notificação sempre que houver um novo agendamento;
    - O prestador deve visualizar todas as notificações não lidas

**RNF - Requisitos Não Funcionais**

    - Os agendamentos do prestador no dia devem ser armazenados em cache;
    - As notificações do prestador devem ser armazenadas no MongoDB;
    - As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

**RN - Regras de negócios**

    - A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamentos de serviços

**RF - Requisitos Funcionais**

    - O usuário deve poder listar todos os prestadores de serviços cadastrados;
    - O usuário deve poder listar os dias de um mês com pelo menos um horário disponível;
    - O usuário deve poder listar os horários disponíveis em um dia especifico de um prestador;
    - O usuário deve poder realizar um agendamento com um prestador;

**RNF - Requisitos Não Funcionais**

    - A listagem de prestadores devem ser armazenadas em cache;

**RN - Regras de negócios**

    - Cada agendamento deve durar 1h exatamente;
    - Os agendamentos devem estar disponíveis entre 8:00 ás 18:00(Primeiro as 8:00, último as 17:00);
    - O usuário não pode agendar em um horário já ocupado;
    - O usuário não pode agendar em um horário que já passou;
    - O usuário não pode agendar serviços consigo mesmo;
