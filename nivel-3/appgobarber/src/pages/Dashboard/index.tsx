import React from 'react';
import { View } from 'react-native';

import { useAlth } from '../../hooks/auth';
// import { Container } from './styles';

import Button from '../../components/Button';

const Dashboard: React.FC = () => {
    const { signOut } = useAlth();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Button onPress={signOut}>Sair</Button>
        </View>
    );
};

export default Dashboard;
