let initialState = {
  isLoggedIn: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default appReducer;
