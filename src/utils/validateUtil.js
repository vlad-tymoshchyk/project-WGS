export default obj => {
  const errors = {};
  const { email, password } = obj;
  if (password) {
    if (password.trim() === '') errors.password = 'Password is required.';
  }
  if (email) {
    const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const emailTested = regExp.test(String(email).toLowerCase());
    if (email.trim() === '') errors.email = 'Email is required.';
    if (!emailTested) {
      errors.email = 'Email is invalid. Please check your email and try again.';
    }
  }
  return Object.keys(errors).length === 0 ? null : errors;
};
