import React from 'react';
import Styles from '../../summary.module.css';

const SummaryLog = ({ record }) => {
  console.log(record);
  return (
    <div className={Styles.SummaryBox}>
      <h1>Summary: </h1>
      <table>
        {Object.entries(record).map(([user, amount]) =>
          amount === 0 ? null : (
            <tr>
              <td>
                {amount > 0 ? `You owe ${user} ₹` : `${user} owes you ₹`}
                {Math.abs(amount.toFixed(2))}
              </td>
            </tr>
          )
        )}
      </table>
    </div>
  );
};

export default SummaryLog;
