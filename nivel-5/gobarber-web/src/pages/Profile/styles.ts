import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
    > header {
        height: 144px;
        background: #28262e;
        display: flex;
        align-items: center;
        padding: 0 8%;

        svg {
            color: #999591;
            width: 24px;
            height: 24px;
        }
    }
`;

export const Content = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: -176px auto 0 auto;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
        display: flex;
        flex-direction: column;

        div.margin {
            margin-top: 25px;
        }

        h1 {
            margin-bottom: 24px;
            font-size: 20px;
            text-align: left;
        }
    }
`;

export const AvatarInput = styled.div`
    position: relative;
    margin-bottom: 32px;
    align-self: center;

    > img {
        width: 186px;
        height: 186px;
        border-radius: 50%;
    }

    label {
        position: absolute;
        width: 48px;
        height: 48px;
        bottom: 0;
        border: none;
        background: #ff9000;
        right: 0;
        border-radius: 50%;
        transition: background-color 0.2s linear;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        svg {
            width: 20px;
            height: 20px;
            color: #312e38;
        }

        input {
            display: none;
        }

        &:hover {
            background: ${shade(0.2, '#ff9000')};
        }
    }
`;
