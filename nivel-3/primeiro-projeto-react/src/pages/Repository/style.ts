import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: all 0.2s linear;

    &:hover {
      color: #666;
    }

    svg {
      margin-right: 4px;
    }
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;
    div {
      margin-left: 24px;
      flex: 1;

      strong {
        font-size: 36px;
        color: #3d3d4d;
      }

      P {
        margin-top: 5px;
        font-size: 18px;
        color: #737380;
      }
    }

    img {
      width: 120px;
      height: 120px;
      border-radius: 100%;
      text-decoration: none;
    }
  }
  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }

      strong {
        display: block;
        font-size: 36px;
      }
      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;
      }
    }
  }
`;

export const Issues = styled.div`
  margin-top: 80px;

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

    svg {
      margin-left: auto;
      color: #a8a8b3;
    }
  }
`;
