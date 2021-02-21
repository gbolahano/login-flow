import React, { Fragment } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import validate from "../../utils/signin-utils";

import { FormLayout, StyledInput, StyledButton, Error, StyledLink } from "./styles";

const SIGNIN = gql`
  mutation SIGNIN($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      user {
        id
        name
      }
      auth
    }
  }
`;

const Index = () => {
  const [signin, { loading }] = useMutation(SIGNIN);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { setErrors }) => {
      try {
        await signin({
          variables: values,
        });
        history.push("/items");
      } catch (err) {
        const { message } = err;
        if (message === "Invalid Email Address") {
          setErrors({
            email: message,
          });
          return;
        }
        // const errorMessage = err.graphQLErrors[0].message;
        if (message === "Invalid Login Parameters") {
          setErrors({
            email: message,
            password: message,
          });
        }
      }
    },
  });

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <FormLayout>
          <p>Sign in to your account</p>
          <div>
            <StyledInput
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email address"
              error={formik.errors.email ? true : false}
            />
            {formik.errors.email ? <Error>{formik.errors.email}</Error> : null}
          </div>
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
            <StyledButton type="submit">
              {loading ? "Logging In" : "Log In"}
            </StyledButton>
          </div>
          <div>
            <StyledLink to="/reset/password">Reset password</StyledLink>
          </div>
        </FormLayout>
      </form>
    </Fragment>
  );
};

export default Index;
