import React, { Fragment, useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import { useFormik } from "formik";
import validate from "../../utils/password-utils";

import {
  FormLayout,
  StyledInput,
  StyledButton,
  Error,
  StyledLink,
} from "./styles";

const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD(
    $resetToken: String!
    $password: String!
    $verifyPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      verifyPassword: $verifyPassword
    ) {
      name
      email
    }
  }
`;

const Index = (props) => {
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const parseString = queryString.parse(location.search);
    setToken(parseString.resetToken);
  }, []);
  const formik = useFormik({
    initialValues: {
      password: "",
      verifyPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        await resetPassword({
          variables: {
            ...values,
            resetToken: token,
          },
        });
        history.push("/login");
      } catch (err) {
        // const errorMessage = err.graphQLErrors[0].message;
        const { message } = err;
        if (message === "This token is either invalid or expired!") {
          setStatus(message);
        }
      }
    },
  });

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <FormLayout>
          <p>Password Reset</p>
          <div>
            <StyledInput
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              error={formik.errors.password ? true : false}
            />
            {formik.errors.password ? (
              <Error>{formik.errors.password}</Error>
            ) : null}
          </div>
          <div>
            <StyledInput
              id="verifyPassword"
              name="verifyPassword"
              type="password"
              value={formik.values.verifyPassword}
              onChange={formik.handleChange}
              placeholder="Confirm Password"
              error={formik.errors.verifyPassword ? true : false}
            />
            {formik.errors.verifyPassword ? (
              <Error>{formik.errors.verifyPassword}</Error>
            ) : null}
          </div>
          <Error>{status}</Error>
          <div>
            <StyledButton type="submit">
              {loading ? "Saving" : "Save"}
            </StyledButton>
          </div>
        </FormLayout>
      </form>
    </Fragment>
  );
};

export default Index;
