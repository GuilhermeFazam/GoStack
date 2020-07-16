import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
    type?: 'info' | 'success' | 'error';
    hasDescription: boolean;
}
const toastTypeVariations = {
    info: css`
        background: #ebf8ff;
        color: #3172b7;
    `,

    success: css`
        background: #e6fffa;
        color: #2e656a;
    `,

    error: css`
        background: #fddede;
        color: #c53030;
    `,
};

export const Container = styled(animated.div) <ContainerProps>`
    width: 360px;
    position: relative;
    padding: 16px 30px 16px 16px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    & + div {
        margin-top: 15px;
    }

    ${props => toastTypeVariations[props.type || 'info']}

    > svg {
        margin-right: 10px;
        font-size: 20px;
    }

    > div {
        flex: 1;
        p {
            margin-top: 4px;
            opacity: 0.8;
            font-size: 14px;
            line-height: 20px;
        }
    }

    button {
        position: absolute;
        right: 5px;
        top: 5px;
        background: transparent;
        border: none;
        width: 20px;
        color: inherit;

        svg {
            font-size: 18px;
        }
    }

    ${props =>
        !props.hasDescription &&
        css`
            button {
                top: 15px;
            }
        `}
`;
