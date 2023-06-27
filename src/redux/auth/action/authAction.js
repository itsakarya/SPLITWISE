import { ActionTypes } from '../constant/authTypes';

export const authAction = (userName, password) => {
  return {
    type: ActionTypes.SIGN_IN,
    payload: {
      userName,
      password,
    },
  };
};

export const logout = () => {
  return {
    type: ActionTypes.LOGOUT,
  };
};

export const signup = (userName, name, email, password) => {
  return {
    type: ActionTypes.SIGN_UP,
    payload: {
      userName,
      name,
      email,
      password,
    },
  };
};

export const groupChange = (userName, groupId) => {
  return {
    type: ActionTypes.GROUP_CHANGE,
    payload: {
      userName,
      groupId,
    },
  };
};

export const setGroupId = (groupId, userName) => {
  return {
    type: ActionTypes.SET_GROUP_ID,
    payload: {
      groupId,
      userName,
    },
  };
};
