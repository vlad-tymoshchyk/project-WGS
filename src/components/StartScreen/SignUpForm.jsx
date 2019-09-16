import React from 'react';
import { Link } from 'react-router-dom';
import FormWrapper from './FormWrapper';

function SignUpForm(props) {
  const { onSubmit } = props;
  return (
    <FormWrapper>
      <form onSubmit={onSubmit} className="p-4">
        <label htmlFor="login">Login Name</label>
        <input
          type="text"
          className="d-block w-100 p-1"
          name="login"
          id="login"
          placeholder="Enter your login"
        />
        <label htmlFor="password" className="mt-2">Password</label>
        <input
          type="password"
          className="d-block w-100 p-1"
          name="password"
          id="password"
          placeholder="Enter your password"
        />
        <label htmlFor="password" className="mt-2">Repeat password</label>
        <input
          type="password"
          className="d-block w-100 p-1"
          name="password"
          id="repeat-password"
          placeholder="Repeat password"
        />
        <hr className="bg-dark" />
        <div className="d-flex container justify-content-end ml-1">
          <input
            type="submit"
            className="d-block submit-button"
            value="Sign up"
          />
        </div>
      </form>
      <div className="text-center mt-2">
        <Link to="/login" className="text-dark">Login</Link>
      </div>
    </FormWrapper>
  );
}

export default SignUpForm;
