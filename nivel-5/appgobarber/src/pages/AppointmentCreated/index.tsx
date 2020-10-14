import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    Title,
    Descripition,
    OkButton,
    OkButtonText,
} from './style';

const AppointmentCreated: React.FC = () => {
    const { reset } = useNavigation();
    const handleOkPressed = useCallback(() => {
        reset({
            routes: [
                {
                    name: 'Dashboard',
                },
            ],
            index: 0,
        });
    }, [reset]);

    return (
        <Container>
            <Icon name="check" size={80} color="#04d361" />
            <Title>Agendamento concluído</Title>
            <Descripition>Teste</Descripition>

            <OkButton onPress={handleOkPressed}>
                <OkButtonText>Ok</OkButtonText>
            </OkButton>
        </Container>
    );
};

export default AppointmentCreated;
