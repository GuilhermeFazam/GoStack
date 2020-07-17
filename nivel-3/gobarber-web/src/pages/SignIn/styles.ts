import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signBackgroundImg from '../../assets/sign-in-background.png';

const appearFromLeft = keyframes`
    from{
        opacity: 0;
        transform: translateX(-50px);
    }
    to{
        opacity: 1;
        transform: translateX(0px);
    }
`;
export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
`;

export const AnimaitonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    animation: ${appearFromLeft} 1s;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1 {
            margin-bottom: 24px;
        }
        a {
            color: #f4ede8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s ease-in-out;
            &:hover {
                color: ${shade(0.2, '#f4ede8')};
            }
        }
    }

    > a {
        color: #ff9000;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s ease-in-out;

        display: flex;
        align-items: center;

        &:hover {
            color: ${shade(0.2, '#ff9000')};
        }

        svg {
            margin-right: 16px;
        }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${signBackgroundImg}) no-repeat center;
    background-size: cover;
`;
