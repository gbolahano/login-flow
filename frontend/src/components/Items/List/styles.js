import styled from 'styled-components';

export const Layout = styled.div`
  margin: 0 auto;
  display: grid;
  grid-gap: 20px;
  margin-top: 40px;
  grid-template-columns: 1fr;
  width: 45vw;
  padding: 10px;
  background-color: #fff;
  box-shadow:
    0 3.4px 10px rgba(0, 0, 0, 0.028),
    0 27px 80px rgba(0, 0, 0, 0.07)
  ;
  p {
    text-align: center;
    font-size: 1rem;
    margin: 20px
  };
  table {
    table-layout: auto;
    /* width: 100%; */
  }
  tr {
    margin-bottom: 5px;
  }
  th {
    text-align: left;
    font-size: 1.1rem;
  }
  td {
    font-size: .9rem;
    padding: 5px 0px;
  }
  td:first-child {
    width: 70%;
  }
`;