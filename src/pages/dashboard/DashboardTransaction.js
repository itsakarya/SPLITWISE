import React from 'react';
import TransactionLog from './components/transactionLog/TransactionLog';
import styles from './transaction.module.css';

const Middle = () => {
  return (
    <div className={styles.containerBox}>
      <TransactionLog />
    </div>
  );
};

export default Middle;
