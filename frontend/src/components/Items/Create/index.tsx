import React, { Fragment } from "react";
import { useFormik } from "formik";
import { useMutation, gql } from "@apollo/client";
import {
  FormLayout,
  StyledInput,
  StyledButton,
  Error,
  FormGroup,
} from "./styles";
import validate from "../../../utils/create-utils";
import { GET_ITEMS } from "../List";

const CREATE_ITEM = gql`
  mutation CREATE_ITEM($title: String!) {
    createItem(data: { title: $title }) {
      title
      createdAt
    }
  }
`;

const Index = () => {
  const [createItem, { loading }] = useMutation(CREATE_ITEM);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        await createItem({
          variables: values,
          refetchQueries: [{ query: GET_ITEMS }],
        });
        values.title = "";
      } catch (err) {}
    },
  });

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <FormLayout>
          <FormGroup>
            <StyledInput
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder="Add new item"
              error={formik.errors.title ? true : false}
            />
            {formik.errors.title ? <Error>{formik.errors.title}</Error> : null}
          </FormGroup>

          <StyledButton type="submit">
            {loading ? "saving" : "save"}
          </StyledButton>
        </FormLayout>
      </form>
    </Fragment>
  );
};

export default Index;
