import React, { Fragment } from "react";
import {useHistory} from 'react-router-dom';
import { useMutation, gql } from "@apollo/client";
import { useFormik } from "formik";

import { FormLayout, StyledInput, StyledButton, Error } from "./styles";
import validate from "../../utils/formik-utils";
// import Index from "../items/ItemsList";

const SIGNUP = gql`
  mutation SIGNUP($name: String!, $email: String!, $password: String!) {
    signup(data: { name: $name, email: $email, password: $password }) {
      name
      email
      password
    }
  }
`;

const Index = (props) => {
  const [signup, { loading }] = useMutation(SIGNUP);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      verifyPassword: "",
    },
    validate,
    onSubmit: async (values, { setErrors }) => {
      try {
        await signup({
          variables: values,
        });
        history.push("/login");
      } catch (err) {
        const emailError = err.graphQLErrors[0].message;
        setErrors({ email: emailError });
      }
    },
  });

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <FormLayout>
          {/* <h2>Mercury</h2> */}
          <p>Sign up to create an account</p>
          <div>
            <StyledInput
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Full name"
              error={formik.errors.name ? true : false}
            />
            {formik.errors.name ? <Error>{formik.errors.name}</Error> : null}
          </div>

          <div>
            <StyledInput
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
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
              onChange={formik.handleChange}
              value={formik.values.password}
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
              onChange={formik.handleChange}
              value={formik.values.verifyPassword}
              placeholder="Confirm Password"
              error={formik.errors.verifyPassword ? true : false}
            />
            {formik.errors.verifyPassword ? (
              <Error>{formik.errors.verifyPassword}</Error>
            ) : null}
          </div>

          <div>
            <StyledButton type="submit">
              {loading ? "Signin up" : "Sign up"}
            </StyledButton>
          </div>
        </FormLayout>
      </form>
    </Fragment>
  );
};

export default Index;
