import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

class FormWrapper extends Component {
  componentWillUnmount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  render() {
    // eslint-ignore-next-line
    const { children, isLoggedIn } = this.props;
    return isLoggedIn ? (
      <Redirect to="/" />
    ) : (
      <div className="login-screen wrapper fadeInDown w-100 d-flex flex-column">
        {/* TODO: it will be refactored */}
        <Switch>
          <Route path="/login">
            <h4 className="text-center mt-5 mb-3">Hello!</h4>
          </Route>
          <Route path="/forgot-password">
            <h4 className="text-center mt-5 mb-3">Reset Password</h4>
          </Route>
        </Switch>
        <div className="form-container mx-auto">{children}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearErrors: () => {
      dispatch({ type: 'CLEAR_VALIDATION_ERRORS' });
    },
  };
};

const mapStateToProps = ({
  authReducer: { isLoggedIn, validationErrors: errors },
}) => {
  return {
    isLoggedIn,
    errors,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormWrapper);
