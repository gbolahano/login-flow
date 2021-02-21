import React, { Fragment, useState } from "react";
import { useMutation, gql } from "@apollo/client";

import { useFormik } from "formik";

import validate from "../../utils/reset-utils";

import { FormLayout, StyledInput, StyledButton, Error } from "./styles";

const PASSWORD_RESET = gql`
  mutation PASSWORD_RESET($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const Index = (props) => {
  const [resetPassword, { loading }] = useMutation(PASSWORD_RESET);

  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: async (values, { setErrors }) => {
      try {
        const {
          data: { requestReset },
        } = await resetPassword({
          variables: values,
        });
        setMessage(requestReset.message);
      } catch (err) {
        const { message } = err;
        if (message === "This email is Invalid!") {
          setErrors({
            email: message,
          });
        }
      }
    },
  });

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <FormLayout>
          <p>Request passord reset</p>
          <h2>{message}</h2>
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
