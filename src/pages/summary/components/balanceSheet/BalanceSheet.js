import React from 'react';
import styles from './balanceSheet.module.css';
const BalanceSheet = ({ desc, amount }) => {
  return (
    <div className={styles.balanceSheet}>
      <li>{desc}</li>
      <li>
        <i className='bi bi-currency-rupee'>{amount}</i>
      </li>
    </div>
  );
};

export default BalanceSheet;
