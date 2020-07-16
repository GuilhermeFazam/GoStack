import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;
  margin-top: 120px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;
  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    font-size: 18px;
    border: 1px solid #fff;
    border-right: 0;

    ${props =>
    props.hasError &&
    css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }
  button {
    transition: all 0.3s linear;
    height: 70px;
    width: 210px;
    background: #04d361;
    border-radius: 0px 5px 5px 0px;
    border: 0;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    padding: 27px 64px;
    color: #fff;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Repository = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    width: 100%;
    display: flex;
    background: #fff;
    text-decoration: none;
    align-items: center;
    border-radius: 5px;
    padding: 24px;
    transition: all 0.2s linear;

    & + a {
      margin-top: 20px;
    }
    &:hover {
      transform: translateX(5px);
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      P {
        margin-top: 5px;
        font-size: 18px;
        color: #a8a8b3;
      }
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 100%;
      text-decoration: none;
    }
    svg {
      margin-left: auto;
      color: #a8a8b3;
    }
  }
`;

export const InputError = styled.span`
  display: block;
  color: #c53030;
  margin-top: 30px;
`;
