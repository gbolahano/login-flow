const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 30) {
    errors.name = 'Must be 30 characters or less';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Must be 8 characters or more';
  }

  if (!values.verifyPassword) {
    errors.verifyPassword = 'Required';
  } else if (values.verifyPassword.length < 8) {
    errors.verifyPassword = 'Must be 8 characters or more';
  } else if (values.password !== values.verifyPassword) {
    errors.verifyPassword = 'Passwords do not match';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default validate;