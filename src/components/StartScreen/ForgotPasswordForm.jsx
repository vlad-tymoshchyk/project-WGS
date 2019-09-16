import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormWrapper from './FormWrapper';
import style from './FormWrapper.module.scss';
import validate from '../../utils/validateUtil';
import DataFetcher from '../../utils/DataFetcher';

function ForgotPasswordForm() {
  const [validationErrors, setValidationErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [message, setMessage] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    setServerError('');
    const email = e.target.email.value;
    const emailValidationErrors = validate({ email });
    setValidationErrors(emailValidationErrors);
    if (!emailValidationErrors) {
      DataFetcher.resetPassword(email).then(res => {
        if (res.data && res.data.successful) {
          setMessage('The invitation link has been sent to your email');
        } else {
          setServerError('Email was not found');
        }
      });
    }
  };

  // const { onSubmit, errors } = props;
  return (
    <FormWrapper>
      <form onSubmit={onSubmit} className="p-4">
        {message ? (
          <>
            <div className="text-center text-success">{message}</div>
            <div className="text-center">
              <Link
                to="/login"
                className={`${style.linkBackToLogin} text-dark py-2`}
              >
                Back to Login
              </Link>
            </div>
          </>
        ) : (
          <>
            {serverError && (
              <div className="alert alert-warning text-center">
                {serverError}
              </div>
            )}
            <div className={style.forgotPasswordHeading}>
              Please enter your registered email address to request a password
              reset
            </div>
            <input
              type="text"
              className="d-block w-100 p-1"
              name="email"
              id="login"
              placeholder="Enter your login"
            />
            {validationErrors && validationErrors.email && (
              <div className={style.errorMessage}>{validationErrors.email}</div>
            )}
            <hr className="bg-dark" />
            <div className="d-flex justify-content-between ml-1">
              <Link
                to="/login"
                className={`${style.linkBackToLogin} text-dark py-2`}
              >
                Back to Login
              </Link>
              <input
                type="submit"
                className="d-block submit-button px-3 py-2"
                value="Reset password"
              />
            </div>
          </>
        )}
      </form>
    </FormWrapper>
  );
}

export default ForgotPasswordForm;
