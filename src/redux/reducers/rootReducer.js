import {combineReducers} from 'redux';
import user from './userReducer';
import app from './appReducer';

const combinedReducers = combineReducers({
  user,
  app
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return combinedReducers(state, action);
};

export default rootReducer;
