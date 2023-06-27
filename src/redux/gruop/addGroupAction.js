import { ADD_GROUP_TYPES } from './addGroupTypes';

export const addgroup = (groupID, groupName, userName) => {
  return {
    type: ADD_GROUP_TYPES.ADD_GROUP,
    payload: {
      groupID,
      groupName,
      userName,
    },
  };
};

export const getGroupId = (groupID) => {
  return {
    type: ADD_GROUP_TYPES.GROUP_ID,
    payload: groupID,
  };
};
export const addExpense = (
  amount,
  description,
  Paidby,
  PaidFor,
  splitPerHead,
  category,
  date
) => {
  return {
    type: ADD_GROUP_TYPES.ADD_EXPENSE,
    payload: {
      amount,
      description,
      Paidby,
      PaidFor,
      splitPerHead,
      category,
      date,
    },
  };
};
export const addfriend = (userName) => {
  return {
    type: ADD_GROUP_TYPES.ADD_FRIEND,
    payload: userName,
  };
};
