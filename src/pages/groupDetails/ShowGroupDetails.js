import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddExpense from './components/expense/AddExpense';
import Expense from './components/modals/Expense';
import AddFriend from './components/friend/AddFriend';
import Friend from './components/modals/Friend';

const ShowGroupDetails = () => {
  const [expenseIsOpen, setExpenseIsOpen] = useState(false);
  const [friendIsOpen, setFriendIsOpen] = useState(false);
  const groupId = useSelector((reduxStore) => reduxStore.groups.group_id);
  console.log(groupId);
  const groups = useSelector((reduxStore) => reduxStore.groups.group);
  const group = groups[groupId];

  return (
    <div>
      <h3>Members of Group - {group.groupName}</h3>
      {group.members.map((person) => (
        <p> {person}</p>
      ))}
      <AddExpense setExpenseIsOpen={setExpenseIsOpen} />
      <Expense
        expenseIsOpen={expenseIsOpen}
        setExpenseIsOpen={setExpenseIsOpen}
      />
      <AddFriend setFriendIsOpen={setFriendIsOpen} />
      <Friend friendIsOpen={friendIsOpen} setFriendIsOpen={setFriendIsOpen} />
    </div>
  );
};

export default ShowGroupDetails;
