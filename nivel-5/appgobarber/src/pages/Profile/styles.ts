import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 100px 30px ${Platform.OS === 'android' ? 120 : 40}px;
    margin-top: 40px;
`;

export const BackButton = styled.TouchableOpacity``;

export const Title = styled.Text`
    font-size: 20px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    margin: 24px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
    margin-top: 24px;
`;

export const UserAvatar = styled.Image`
    width: 186px;
    height: 186px;
    margin-top: -40px;
    border-radius: 98px;
    align-self: center;
`;
