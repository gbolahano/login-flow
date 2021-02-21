const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 30) {
    errors.title = 'Must be 30 characters or less';
  }

  return errors;
};

export default validate;