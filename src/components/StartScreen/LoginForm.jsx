import React from 'react';
import { Link } from 'react-router-dom';
import FormWrapper from './FormWrapper';
import style from './FormWrapper.module.scss';

function LoginForm(props) {
  const { onSubmit, errors } = props;
  return (
    <FormWrapper>
      <form onSubmit={onSubmit} className="p-4">
        <label htmlFor="login">Login Name</label>
        <input
          type="text"
          className="d-block w-100 p-1"
          name="email"
          id="email"
          placeholder="Enter your login"
        />
        {errors.email ? (
          <div className={style.errorMessage}>{errors.email}</div>
        ) : null}
        <label htmlFor="password" className="mt-2">
          Password
        </label>
        <input
          type="password"
          className="d-block w-100 p-1"
          name="password"
          id="password"
          placeholder="Enter your password"
        />
        {errors.password ? (
          <div className={style.errorMessage}>{errors.password}</div>
        ) : null}
        <hr className="bg-dark" />
        <div className="d-flex container justify-content-between ml-1">
          <input type="checkbox" id="remember" className="form-check-input" />
          <label htmlFor="remember">Remember me</label>
          <input
            type="submit"
            className="d-block float-right submit-button"
            value="Login"
          />
        </div>
      </form>
      <div className="text-center mt-2">
        <span className="mr-1">Need help?</span>
        <Link to="/forgot-password" className="text-dark">
          Reset your Password
        </Link>
      </div>
    </FormWrapper>
  );
}

export default LoginForm;
