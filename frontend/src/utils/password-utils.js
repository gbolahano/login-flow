const validate = values => {
  const errors = {};
  
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


  return errors;
};

export default validate;