import axios from 'axios';
import validate from '../utils/validateUtil';

// const url = process.env.BASE_URL;
const url = process.env.REACT_APP_AUTHORIZATION_ENDPOINT || '';

export const userLogIn = e => {
  e.preventDefault();
  return dispatch => {
    const email = e.target.email.value;
    const password = e.target.password.value;
    const errors = validate({ email, password });

    return errors
      ? dispatch({ type: 'VALIDATION_ERROR', errors })
      : axios
          .post(`${url}/api/userAuths/login`, { email, password })
          .then(({ data }) => {
            if (data) {
              const {
                token,
                name: username = '<No username',
                farmName: farmname = '<No farmname>',
              } = data;
              localStorage.setItem('token', token);
              localStorage.setItem('username', username);
              localStorage.setItem('farmname', farmname);
              axios.defaults.headers.common.Authorization = `Bearer ${token}`;
              dispatch({
                type: 'USER_LOGGED_IN',
                token,
                username,
                farmname,
              });
            }
          });
  };
};
export const userLogOut = () => {
  localStorage.removeItem('token');
  return {
    type: 'USER_LOGGED_OUT',
  };
};
