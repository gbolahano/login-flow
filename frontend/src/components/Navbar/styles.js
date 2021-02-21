import styled from 'styled-components';

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  font-size: 1.1rem;
`;

export const Menu = styled.ul`
  display: flex;
  li {
    list-style-type: none;
    margin: 0px 5px;
    a {
      padding: 5px 10px;
      text-decoration: none;
      display: block;
      color: #03002E;
      transition: 0.2s ease-in;
      border-radius: 5px;

      &:hover {
        background-color: rgba(0,0,0,.1);
      }

      &:visited, &:active {
        text-decoration: none;
      }
    }
  }
`;

export const Logo = styled.div`
  a {
    text-decoration: none;
    display: block;
    color: #03002E;
    font-size: 30px;

    &:visited, &:active {
      text-decoration: none;
    }
  }

`;

export const NavLinks = styled.ul`
  display: flex;
  li {
    list-style-type: none;
    margin: 0px 5px;
    a {
      padding: 5px 10px;
      text-decoration: none;
      display: block;
      color: #03002E;
      transition: 0.2s ease-in;
      border-radius: 5px;

      &:hover {
        /* background-color: rgba(0,0,0,.1); */
        background-color: #f7f7f7;
      }

      &:visited, &:active {
        text-decoration: none;
      }
    }
  }
`;

export const Link = styled.a`

`
