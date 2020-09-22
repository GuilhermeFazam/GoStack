import React, { ChangeEvent, useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErros from '../../utils/getValidationErros';
import { useAlth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Container, Content, AvatarInput } from './styles';

interface ProfileForData {
    name: string;
    email: string;
    old_password: string;
    password: string;
    password_confirmation: string;
}

const Profile: React.FC = () => {
    const { user, updateUser } = useAlth();
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleAvatarChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const data = new FormData();
                data.append('avatar', e.target.files[0]);
                api.patch('/users/avatar', data).then(response => {
                    updateUser(response.data);
                    addToast({
                        type: 'success',
                        title: 'Imagem do Avatar atualizada',
                        description: 'A sua imagem de avatar foi atualizada',
                    });
                });
            }
        },
        [addToast, updateUser],
    );

    const handleSubmit = useCallback(
        async (data: ProfileForData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('E-mail inválido'),
                    old_password: Yup.string(),
                    password: Yup.string().when('old_password', {
                        is: val => !!val.length,
                        then: Yup.string().required('Senha obrigatória'),
                        otherwise: Yup.string(),
                    }),
                    password_confirmation: Yup.string()
                        .when('old_password', {
                            is: val => !!val.length,
                            then: Yup.string().required(
                                'Confirmação de senha obrigatória',
                            ),
                            otherwise: Yup.string(),
                        })
                        .oneOf(
                            [Yup.ref('password'), undefined],
                            'Confirmação de senha incorreta',
                        ),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const {
                    name,
                    email,
                    old_password,
                    password,
                    password_confirmation,
                } = data;

                const formData = {
                    name,
                    email,
                    ...(old_password
                        ? {
                              old_password,
                              password,
                              password_confirmation,
                          }
                        : {}),
                };

                const response = await api.put('/profile', formData);

                updateUser(response.data);
                history.push('/dashboard');

                addToast({
                    type: 'success',
                    title: 'Perfil atualizado com sucesso!',
                    description:
                        'As novas informações do seu perfil foram atualizadas.',
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
        [addToast, history, updateUser],
    );

    return (
        <Container>
            <header>
                <Link to="/dashboard">
                    <FiArrowLeft />
                </Link>
            </header>
            <Content>
                <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initialData={{
                        name: user.name,
                        email: user.email,
                    }}
                >
                    <AvatarInput>
                        <img src={user.avatar_url} alt={user.name} />
                        <label htmlFor="avatar">
                            <FiCamera />
                            <input
                                name="avatar"
                                onChange={handleAvatarChange}
                                type="file"
                                id="avatar"
                            />
                        </label>
                    </AvatarInput>

                    <h1>Meu perfil</h1>

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
                    <div className="margin">
                        <Input
                            name="old_password"
                            icon={FiLock}
                            type="password"
                            placeholder="Senha Atual"
                        />

                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Nova Senha"
                        />
                        <Input
                            name="password_confirmation"
                            icon={FiLock}
                            type="password"
                            placeholder="Confirmar Senha"
                        />
                    </div>
                    <Button type="submit">Confirmar Mudanças</Button>
                </Form>
            </Content>
        </Container>
    );
};

export default Profile;
