const initialState = {
  isLoggedIn: false,
  validationErrors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: true,
        token: action.token,
        username: action.username,
        farmname: action.farmname,
      };
    case 'USER_LOGGED_OUT':
      return { ...state, isLoggedIn: false, token: undefined };
    case 'VALIDATION_ERROR':
      return { ...state, validationErrors: action.errors };
    case 'CLEAR_VALIDATION_ERRORS':
      return { ...state, validationErrors: {} };
    default:
      console.log('Unknown type: ', action.type);
  }

  return state;
};
