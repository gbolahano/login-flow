import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  gql,
} from "@apollo/client";

import { setAuth } from "./reducers/authReducer";
import Navbar from "./components/Navbar";
import Routes from "./routes";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

const AUTH_USER = gql`
  query AUTH_USER {
    me {
      name
      email
    }
  }
`;

const App = () => {
  const [initialised, setInitialised] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    client
      .query({ query: AUTH_USER })
      .then(({ data }) => {
        if (data.me) {
          dispatch(setAuth(data.me));
        }
        setInitialised(true);
      })
      .catch((error) => {
        if (error.message === "Please Login") {
          setInitialised(true);
        }
      });
  }, [initialised]);

  if (!initialised) return "Loading...";

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </ApolloProvider>
  );
};

export default App;
export { client, AUTH_USER };
