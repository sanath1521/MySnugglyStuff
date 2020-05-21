import {combineReducers} from 'redux';
import user from './userReducer';
import app from './appReducer';
import order from './orderReducer';


const combinedReducers = combineReducers({
  user,
  app,
  order
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return combinedReducers(state, action);
};

export default rootReducer;
