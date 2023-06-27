import { combineReducers } from 'redux';
import authReducer from './auth/reducer/authReducer';
import groupReducer from './gruop/addGroupReducer';

const reducers = combineReducers({
  reduce: authReducer,
  groups: groupReducer,
});

export default reducers;
