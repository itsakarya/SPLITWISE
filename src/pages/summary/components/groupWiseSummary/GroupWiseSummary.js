import React from 'react';
import { useSelector } from 'react-redux';
import { filterTransactions } from '../../helper/helper';
import styles from './groupWiseSummary.module.css';
const GroupWiseSummary = ({ group }) => {
  const currentUser = useSelector(
    (reduxStore) => reduxStore.reduce.currentUser
  );
  const filteredTransaction = group.transaction.filter(
    filterTransactions(currentUser)
  );

  const total = filteredTransaction?.reduce((total, current) => {
    return total + Number(current.amount);
  }, 0);

  const record = {};

  filteredTransaction?.forEach((transaction) => {
    // const splitAmongCount = transaction.PaidFor.length;
    // const splittedAmount = transaction.amount / splitAmongCount;

    if (transaction.Paidby[0] === currentUser.name) {
      transaction.PaidFor?.forEach((user) => {
        if (user !== currentUser.name) {
          if (record[user] !== undefined) {
            record[user] -=
              (transaction.splitPerHead[user] * transaction.amount) / 100;
          } else {
            record[user] =
              -(transaction.splitPerHead[user] * transaction.amount) / 100;
          }
        }
      });
    } else {
      const user = transaction.Paidby[0];
      if (record[user]) {
        record[user] +=
          (transaction.splitPerHead[user] * transaction.amount) / 100;
      } else {
        record[user] =
          (transaction.splitPerHead[user] * transaction.amount) / 100;
      }
    }
  });

  let youOwe = Object.values(record).reduce(
    (total, currentValue) => (total += Math.max(0, currentValue)),
    0
  );
  let youAreOwed = Object.values(record).reduce(
    (total, currentValue) => (total += Math.abs(Math.min(0, currentValue))),
    0
  );

  return (
    <div className={styles.groupSummaryBox}>
      <h3>{group.groupName}</h3>
      <h3>Totol Balance : {total}</h3>
      <h3>You Owe : {`₹${youOwe.toFixed(2)}`}</h3>
      <h3>You are owed : {` ₹${youAreOwed.toFixed(2)}`}</h3>
    </div>
  );
};

export default GroupWiseSummary;
