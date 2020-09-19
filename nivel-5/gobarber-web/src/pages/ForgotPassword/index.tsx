import React, { useCallback, useRef } from 'react';

import { Link } from 'react-router-dom';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container, Content, Background, AnimaitonContainer } from './styles';
import { useToast } from '../../hooks/toast';
import getValidationErros from '../../utils/getValidationErros';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    // const history = useHistory();

    const handleSubmit = useCallback(
        async (data: ForgotPasswordFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('E-mail inválido'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                // history.push('/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const error = getValidationErros(err);
                    formRef.current?.setErrors(error);
                    return;
                }
                addToast({
                    type: 'error',
                    title: 'Erro na recuperação de senha',
                    description:
                        'Ocorreu um erro ao tentar realizar a recuperação de senha.',
                });
            }
        },
        [addToast],
    );

    return (
        <Container>
            <Content>
                <AnimaitonContainer>
                    <img src={logo} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Recuperar senha</h1>
                        <Input
                            name="email"
                            icon={FiMail}
                            type="text"
                            placeholder="Email"
                        />
                        <Button type="submit">Recuperar</Button>
                    </Form>
                    <Link to="/">
                        <FiLogIn />
                        Voltar ao login
                    </Link>
                </AnimaitonContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default ForgotPassword;
