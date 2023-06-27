import React from 'react';
import { useSelector } from 'react-redux';
import BalanceSheet from './components/balanceSheet/BalanceSheet';
import { filterTransactions } from './helper/helper';
import DisplayGroup from './components/groupWiseSummary/DisplayGroup';
import SummaryLog from './components/SummaryList/SummaryLog';
import Styles from './summary.module.css';

const Summary = () => {
  const currentUser = useSelector(
    (reduxStore) => reduxStore.reduce.currentUser
  );
  const groups = useSelector((reduxStore) => reduxStore.groups.group);

  const totalTransaction = Object.keys(groups)
    .map((key) => groups[key].transaction)
    .reduce((previous, current) => previous.concat(current), []);

  const filteredTransaction = totalTransaction.filter(
    filterTransactions(currentUser)
  );
  console.log(filteredTransaction);
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
  console.log(record);
  return (
    <div className={Styles.Summary_container}>
      <div className={Styles.balanceSheet}>
        <BalanceSheet desc={'TotalBalance'} amount={total} />
        <BalanceSheet desc={'You Owe'} amount={`₹${youOwe.toFixed(2)}`} />
        <BalanceSheet
          desc={'You are owed'}
          amount={` ₹${youAreOwed.toFixed(2)}`}
        />
      </div>
      <DisplayGroup />
      <SummaryLog record={record} />
    </div>
  );
};

export default Summary;
