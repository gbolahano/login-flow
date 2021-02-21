import styled from 'styled-components';

export const FormLayout = styled.div`
  margin: 0 auto;
  display: grid;
  /* justify-items: center; */
  margin-top: 40px;
  grid-template-columns: .75fr .25fr;
  width: 45vw;
  padding: 10px;
  background-color: #fff;
  grid-gap: 10px;
  box-shadow:
    0 3.4px 10px rgba(0, 0, 0, 0.028),
    0 27px 80px rgba(0, 0, 0, 0.07)
  ;
  h2 {
    text-align: center;
    font-size: 1.4rem;
  };
  p {
    text-align: center;
    font-size: 1rem;
    margin: 20px
  };
`;
export const FormGroup = styled.div`
  grid-column: 1 / 2;
`;
export const StyledInput = styled.input`
  padding: 15px 25px;
  width: 100%;
  outline: none;
  border: ${props => props.error === true ? '1px solid red' : '1px solid #ccc' };
  border-radius: 5px;
  font-size: .9rem;
  &:focus {
    border: 2px solid #d580ff;
  };
`;

export const StyledButton = styled.button`
  grid-column: 2 / 3;
  padding: 15px 20px;
  width: 100%;
  height: 47px;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: #b300b2;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
`;

export const Error = styled.div`
  color: red;
  margin-top: 5px;
  font-weight: 600;
`;

