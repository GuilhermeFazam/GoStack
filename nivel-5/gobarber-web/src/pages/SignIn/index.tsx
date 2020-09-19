import React, { useCallback, useRef } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container, Content, Background, AnimaitonContainer } from './styles';
import { useAlth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErros from '../../utils/getValidationErros';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signIn } = useAlth();
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('E-mail inválido'),
                    password: Yup.string().required('Senha obrigatória'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });
                await signIn({
                    email: data.email,
                    password: data.password,
                });
                history.push('/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const error = getValidationErros(err);
                    formRef.current?.setErrors(error);
                    return;
                }
                addToast({
                    type: 'error',
                    title: 'Erro ao fazer login',
                    description:
                        'Ocorreu um erro ao fazer login, cheque as credenciais.',
                });
            }
        },
        [signIn, addToast, history],
    );

    return (
        <Container>
            <Content>
                <AnimaitonContainer>
                    <img src={logo} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu logon</h1>
                        <Input
                            name="email"
                            icon={FiMail}
                            type="text"
                            placeholder="Email"
                        />
                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Senha"
                        />
                        <Button type="submit">Entrar</Button>

                        <a href="/">Esqueci minha senha</a>
                    </Form>
                    <Link to="/signup">
                        <FiLogIn />
                        Criar Conta
                    </Link>
                </AnimaitonContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;
