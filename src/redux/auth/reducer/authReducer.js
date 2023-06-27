import { ActionTypes } from '../constant/authTypes';

const initialState = {
  currentUser: null,
  allUser: JSON.parse(localStorage.getItem('userDetails')) || {},
};

const authReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      onLogin(newState, action);
      return newState;
    case ActionTypes.LOGOUT:
      onLogout(newState, action);
      return newState;
    case ActionTypes.SIGN_UP:
      onSingup(newState, action);
      return newState;
    case ActionTypes.GROUP_CHANGE:
      onGroupChange(newState, action);
      return newState;
    case ActionTypes.SET_GROUP_ID:
      setGroupId(newState, action);
      return newState;
    default:
      return newState;
  }
};

const onLogin = (newState, action) => {
  const { userName } = action.payload;

  const registeredUsers = JSON.parse(localStorage.getItem('userDetails')) || {};

  const registeredUser = registeredUsers[userName];

  if (registeredUser) {
    newState.currentUser = registeredUser;
  }
};

const onLogout = (state, action) => {
  state.currentUser = null;
};

const onSingup = (state, action) => {
  const { userName, name, email, password } = action.payload;
  console.log(state);
  state.allUser[userName] = {
    name: name,
    email: email,
    password: password,
    groupID: [],
  };
  console.log(state.allUser);
  localStorage.setItem('userDetails', JSON.stringify(state.allUser));
};

const onGroupChange = (state, action) => {
  state.allUser[action.payload.userName].groupID.push(action.payload.groupId);
  localStorage.setItem('userDetails', JSON.stringify(state.allUser));
};

const setGroupId = (state, action) => {
  const { groupId, userName } = action.payload;
  state.allUser[userName].groupID.push(groupId);

  localStorage.setItem('userDetails', JSON.stringify(state.allUser));

  const registeredUsers = JSON.parse(localStorage.getItem('userDetails')) || {};

  const registeredUser = registeredUsers[userName];

  if (registeredUser) {
    state.currentUser = registeredUser;
  }
};
export default authReducer;
