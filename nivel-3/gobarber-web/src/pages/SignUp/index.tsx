import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';

import getValidationErros from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: object) => {
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
        } catch (err) {
            const error = getValidationErros(err);
            formRef.current?.setErrors(error);
        }
    }, []);

    /* - Com dados iniciais nos campos =  <ForminitialData={{name: 'Diego',}}onSubmit={handleSubmit}> */
    return (
        <Container>
            <Background />
            <Content>
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
                <a href="/">
                    <FiArrowLeft />
                    Voltar para login
                </a>
            </Content>
        </Container>
    );
};

export default SignUp;
