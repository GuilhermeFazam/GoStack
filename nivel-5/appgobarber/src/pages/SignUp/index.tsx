import React, { useRef, useCallback } from 'react';
import {
    Image,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import api from '../../services/api';
import getValidationErros from '../../utils/getValidationErros';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

interface SignUpForData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const natigation = useNavigation();

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSignUp = useCallback(
        async (data: SignUpForData) => {
            try {
                formRef.current.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('E-mail inválido'),
                    password: Yup.string()
                        .required('Senha obrigatória')
                        .min(6, 'Minimo de 6 caractéres'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/users', data);

                Alert.alert(
                    `${data.name} Cadastro realizado`,
                    'Pode utilizar o aplicativo!',
                );

                // natigation.navigate('SignIn');
                natigation.goBack();
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const error = getValidationErros(err);
                    formRef.current.setErrors(error);
                    return;
                }
                Alert.alert(
                    'Erro ao Cadastrar',
                    'Erro ao Cadastrar um novo usuário.',
                );
            }
        },
        [natigation],
    );

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Container>
                        <Image source={logoImg} />
                        <View>
                            <Title>Crie sua conta</Title>
                        </View>
                        <Form ref={formRef} onSubmit={handleSignUp}>
                            <Input
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current.focus();
                                }}
                            />
                            <Input
                                ref={emailInputRef}
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current.focus();
                                }}
                            />

                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                secureTextEntry
                                textContentType="newPassword"
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current.submitForm();
                                }}
                            />
                            <Button
                                onPress={() => formRef.current.submitForm()}
                            >
                                Criar conta
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackToSignIn onPress={() => natigation.goBack()}>
                <Icon name="arrow-left" size={20} color="#ffffff" />
                <BackToSignInText>Voltar para logon</BackToSignInText>
            </BackToSignIn>
        </>
    );
};

export default SignUp;
