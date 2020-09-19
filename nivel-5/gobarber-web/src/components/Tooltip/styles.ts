import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    margin-right: 16px;

    svg:hover + span {
        opacity: 1;
        visibility: visible;
    }

    span {
        background: #ff9000;
        padding: 8px;
        border-radius: 4px;
        position: absolute;
        bottom: calc(100% + 12px);
        color: #666360;
        font-size: 12px;
        font-weight: 500;
        opacity: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 160px;
        transition: all 0.2s ease-in-out;
        visibility: hidden;

        &:before {
            content: '';
            border-style: solid;
            border-color: #ff9000 transparent;
            border-width: 6px 6px 0 6px;
            top: 100%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }
`;
