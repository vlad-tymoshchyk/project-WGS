import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from './StartScreen/LoginForm';
import SignUpForm from './StartScreen/SignUpForm';
import ForgotPasswordForm from './StartScreen/ForgotPasswordForm';
import { userLogIn } from '../actions/actions';

function AuthContainer(props) {
  const { handleLogin, handleSignUp, handleForgot, errors } = props;
  return (
    <Switch>
      <Route path="/login">
        <LoginForm onSubmit={handleLogin} errors={errors} />
      </Route>
      <Route path="/signup">
        <SignUpForm onSubmit={handleSignUp} errors={errors} />
      </Route>
      <Route path="/forgot-password">
        <ForgotPasswordForm onSubmit={handleForgot} />
      </Route>
    </Switch>
  );
}

const mapStateToProps = state => {
  return {
    errors: state.authReducer.validationErrors,
  };
};

const mapDispatchToProps = dispatch => ({
  handleLogin: e => dispatch(userLogIn(e)),
  handleSignUp: e => {
    e.preventDefault();
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthContainer);
