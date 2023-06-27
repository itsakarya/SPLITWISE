import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Select, Radio } from 'antd';
import dayjs from 'dayjs';
import { filterTransactions } from '../../summary/helper/helper';
import Piechart from '../component/piechart/Piechart';
import ColumnChart from '../component/columnChart/Columnchart';
import styles from './categorial.module.css';

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
const Categorical = () => {
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
    const splittedAmounts = transaction.splitPerHead;
    if (!splittedAmounts[currentUser.name]) {
      return prev;
    }

    const category = transaction.category;
    const date = dayjs(transaction.date);
    const key = `${MONTHS[date.get('month')]} ${date.get('year')}`;

    if (!prev[category]) {
      prev[category] = {};
    }
    if (!prev[category][key]) {
      prev[category][key] = 0;
    }
    prev[category][key] +=
      (transaction.splitPerHead[currentUser.name] * transaction.amount) / 100;
    return { ...prev };
  }, {});

  const [selectedCategories, setSelectedCategories] = useState(
    Object.keys(columnChartDataRaw).length > 0
      ? [Object.keys(columnChartDataRaw)[0]]
      : []
  );

  const xAxisCategories = [
    ...(selectedCategories ?? []).reduce((st, selectedCategory) => {
      Object.keys(columnChartDataRaw[selectedCategory] ?? {}).forEach((item) =>
        st.add(item)
      );
      return st;
    }, new Set()),
  ].sort((date1, date2) => (dayjs(date1).isBefore(dayjs(date2)) ? -1 : 1));

  const columnChartSeries = selectedCategories.reduce(
    (list, selectedCategory) => {
      const selectedCategorySeries = { name: selectedCategory, data: {} };
      xAxisCategories.forEach((date) => {
        selectedCategorySeries.data[date] =
          (selectedCategorySeries.data[date] ?? 0) +
          ((columnChartDataRaw[selectedCategory] ?? {})[date] ?? 0);
      });
      selectedCategorySeries.data = Object.values(selectedCategorySeries.data);
      list.push(selectedCategorySeries);
      return list;
    },
    []
  );
  const pieChartDataRaw = filteredTransaction.reduce((acc, transaction) => {
    const prev = { ...acc };
    const splittedAmounts = transaction.splitPerHead;
    if (!splittedAmounts[currentUser.name]) {
      return prev;
    }
    const category1 = transaction.PaidFor.length === 1 ? 'Personal' : 'Group';
    const category = transaction.category;
    prev[category1] ??= {};
    prev[category1][category] =
      (prev[category1][category] ?? 0) +
      (transaction.splitPerHead[currentUser.name] * transaction.amount) / 100;
    prev['Both'] ??= {};
    prev['Both'][category] =
      (prev['Both'][category] ?? 0) +
      (transaction.splitPerHead[currentUser.name] * transaction.amount) / 100;
    return prev;
  }, {});

  const [selectedCategory, setSelectedCategory] = useState(
    Object.keys(pieChartDataRaw).length > 0
      ? Object.keys(pieChartDataRaw)[0]
      : null
  );
  const pieChartData = Object.entries(
    pieChartDataRaw[selectedCategory] ?? {}
  ).map(([category, expense]) => ({
    type: 'pie',
    name: category,
    y: expense,
  }));

  console.log(pieChartData);
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
      <div className={styles.pieChart}>
        <Piechart data={pieChartData} titleText='' name='Amount' />
      </div>
      Monthly analysis of
      <Select
        mode='multiple'
        defaultValue={selectedCategories}
        placeholder='Select categories'
        style={{ width: '120px' }}
        options={Object.keys(columnChartDataRaw).map((option) => ({
          label: option,
          value: option,
        }))}
        onChange={setSelectedCategories}
      />
      <ColumnChart
        xAxisCategories={xAxisCategories}
        series={columnChartSeries}
      />
    </div>
  );
};

export default Categorical;
