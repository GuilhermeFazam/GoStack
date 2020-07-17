import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container, Content, Background, AnimaitonContainer } from './styles';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErros from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

interface SignUpForData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const handleSubmit = useCallback(
        async (data: SignUpForData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('E-mail inválido'),
                    password: Yup.string().min(6, 'Minimo de 6 caractéres'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/users', data);
                history.push('/');

                addToast({
                    type: 'success',
                    title: 'Cadastro realizado com sucesso!',
                    description: 'Você ja pode fazer o logon no GoBarber',
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const error = getValidationErros(err);
                    formRef.current?.setErrors(error);
                    return;
                }
                addToast({
                    type: 'error',
                    title: 'Erro ao Cadastrar',
                    description: 'Erro ao Cadastrar um novo usuário.',
                });
            }
        },
        [addToast, history],
    );

    /* - Com dados iniciais nos campos =  <ForminitialData={{name: 'Diego',}}onSubmit={handleSubmit}> */
    return (
        <Container>
            <Background />

            <Content>
                <AnimaitonContainer>
                    <img src={logo} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu Cadastro</h1>

                        <Input
                            name="name"
                            icon={FiUser}
                            type="text"
                            placeholder="Nome"
                        />
                        <Input
                            name="email"
                            icon={FiMail}
                            type="text"
                            placeholder="E-mail"
                        />
                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Senha"
                        />
                        <Button type="submit">Cadastrar</Button>
                    </Form>
                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para login
                    </Link>
                </AnimaitonContainer>
            </Content>
        </Container>
    );
};

export default SignUp;
