import React from 'react';
import { View, Button } from 'react-native';

import { useAlth } from '../../hooks/auth';
// import { Container } from './styles';

// import Button from '../../components/Button';

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
            <Button title="Sair" onPress={signOut} />
        </View>
    );
};

export default Dashboard;
