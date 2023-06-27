import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Radio } from 'antd';
import dayjs from 'dayjs';
import { filterTransactions } from '../../summary/helper/helper';
import ColumnChart from '../component/columnChart/Columnchart';
import styles from './allExpenseAnalysis.module.css';
const option = {
  Group: 'Group',
  Personal: 'Personal',
  Both: 'Both',
};
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const AllExpenseAnalysis = () => {
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

  const columnChartDataRaw = filteredTransaction.reduce((acc, transaction) => {
    const prev = { ...acc };
    const date = dayjs(transaction.date);
    const splittedAmounts = transaction.splitPerHead;
    if (!splittedAmounts[currentUser.name]) {
      return prev;
    }

    const category = transaction.PaidFor.length === 1 ? 'Personal' : 'Group';

    const key = `${MONTHS[date.get('month')]} ${date.get('year')}`;

    if (!prev[category]) {
      prev[category] = {};
    }
    if (!prev[category][key]) {
      prev[category][key] = 0;
    }
    prev[category][key] +=
      (transaction.splitPerHead[currentUser.name] * transaction.amount) / 100;

    const category1 = 'Both';
    if (!prev[category1]) {
      prev[category1] = {};
    }
    if (!prev[category1][key]) {
      prev[category1][key] = 0;
    }
    prev[category1][key] +=
      (transaction.splitPerHead[currentUser.name] * transaction.amount) / 100;
    return { ...prev };
  }, {});

  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(columnChartDataRaw).length > 0
      ? Object.keys(columnChartDataRaw)[0]
      : null
  );
  const xAxisCategories = Object.keys(
    columnChartDataRaw[selectedCategory] ?? {}
  ).sort((k1, k2) => {
    const date1 = dayjs(k1);
    const date2 = dayjs(k2);
    return date1.isBefore(date2) ? -1 : 1;
  });
  console.log(xAxisCategories);
  const columnChartSeries = [
    {
      name: 'Expenses',
      data: xAxisCategories.map(
        (val) => columnChartDataRaw[selectedCategory][val]
      ),
    },
  ];
  console.log(columnChartDataRaw);
  console.log(columnChartSeries);

  return (
    <div className={styles.container}>
      <Radio.Group
        value={selectedCategory}
        buttonStyle='solid'
        onChange={(val) => {
          setSelectedCategory(val.target.value);
        }}
      >
        {Object.values(option).map((option) => (
          <Radio.Button key={option} value={option}>
            {option}
          </Radio.Button>
        ))}
      </Radio.Group>
      <ColumnChart
        xAxisTitleText='Months'
        yAxisTitleText='Amount(₹)'
        xAxisCategories={xAxisCategories}
        series={columnChartSeries}
      />
    </div>
  );
};

export default AllExpenseAnalysis;
