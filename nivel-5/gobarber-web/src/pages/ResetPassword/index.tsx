import React, { useCallback, useRef } from 'react';

import { useHistory, useLocation, useParams } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container, Content, Background, AnimaitonContainer } from './styles';
import { useToast } from '../../hooks/toast';
import getValidationErros from '../../utils/getValidationErros';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface ResetPasswordFormDataFormData {
    password: string;
    password_confirmation: string;
}

const ResetPasswordFormData: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const location = useLocation();

    const handleSubmit = useCallback(
        async (data: ResetPasswordFormDataFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    password: Yup.string().required('Senha obrigatória'),
                    password_confirmation: Yup.string().oneOf(
                        [Yup.ref('password'), undefined],
                        'Confirmação de senha incorreta',
                    ),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const { password, password_confirmation } = data;
                const token = location.search.replace('?token=', '');

                if (!token) {
                    throw new Error();
                }

                api.post('/password/reset', {
                    password,
                    password_confirmation,
                    token,
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
                    title: 'Erro ao resetar senha',
                    description: 'Ocorreu um erro ao resetar sua senha.',
                });
            }
        },
        [addToast, history, location],
    );

    return (
        <Container>
            <Content>
                <AnimaitonContainer>
                    <img src={logo} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Resetar sua senha</h1>
                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Nova senha"
                        />
                        <Input
                            name="password_confirmation"
                            icon={FiLock}
                            type="password"
                            placeholder="Confirmação da senha"
                        />
                        <Button type="submit">Alterar Senha</Button>
                    </Form>
                </AnimaitonContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default ResetPasswordFormData;
