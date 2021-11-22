import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  background: blue;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 1.5em;
  margin-left: 10px;
  /* margin: 0; */
  /* align-self: flex-start; */
  /* justify-self: flex-start; */
`;

export const ButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Button = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  outline: none;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  &:hover {
    color: #000;
  }
`;
