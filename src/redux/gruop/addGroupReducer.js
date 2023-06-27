import { ADD_GROUP_TYPES } from './addGroupTypes';

const initialgroupstate = {
  group: JSON.parse(localStorage.getItem('group')) || {},
  group_id: null,
};

const groupReducer = (state = initialgroupstate, action) => {
  const newState = Object.assign({}, state);
  // console.log(newState);
  switch (action.type) {
    case ADD_GROUP_TYPES.ADD_GROUP:
      addGroup(newState, action);
      return newState;
    case ADD_GROUP_TYPES.GROUP_ID:
      getGrpupId(newState, action);
      return newState;
    case ADD_GROUP_TYPES.ADD_EXPENSE:
      addexpense(newState, action);
      return newState;
    case ADD_GROUP_TYPES.ADD_FRIEND:
      addFriend(newState, action);
      return newState;
    default:
      return newState;
  }
};

const addGroup = (state, action) => {
  const { groupID, groupName, userName } = action.payload;

  if (!state.group[groupID]) {
    state.group[groupID] = {
      groupName: groupName,
      transaction: [],
      members: [userName],
      transactionSharePerHead: [],
    };
    // console.log(state);
  }
  localStorage.setItem('group', JSON.stringify(state.group));
};

const getGrpupId = (state, action) => {
  state.group_id = action.payload;
};
const addexpense = (state, action) => {
  // console.log(action.payload);
  state.group[state.group_id].transaction.push(action.payload);
  localStorage.setItem('group', JSON.stringify(state.group));
};

const addFriend = (state, action) => {
  state.group[state.group_id].members.push(action.payload);
  localStorage.setItem('group', JSON.stringify(state.group));
  // console.log(state);
  // console.log(action.payload);
};
export default groupReducer;
