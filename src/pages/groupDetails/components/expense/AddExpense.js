import React from 'react';

const AddExpense = ({ setExpenseIsOpen }) => {
  function openloginModal() {
    setExpenseIsOpen(true);
  }

  return (
    <button className='btn' onClick={openloginModal}>
      Add Expense
    </button>
  );
};
export default AddExpense;
