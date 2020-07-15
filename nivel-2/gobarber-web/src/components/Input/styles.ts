import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  color: #666360;
  width: 100%;
  /* padding: 16px; */
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;

  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
      color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}


  input {
    color: #f4ede8;
    padding: 16px;
    flex: 1;
    border: 0;
    background: transparent;

    &::placeholder {
      color: #666360;
    }
  }
  svg {
    margin-left: 16px;
  }
`;

export const Error = styled(Tooltip)`
  svg {
    margin: 0;
    font-size: 18px;
    color: #c53030;
  }
  span {
    background: #c53030;
    color: #f4ede8;

    &:before {
      border-color: #c53030 transparent;
    }
  }
`;
